import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Header, Page } from '@/components/Primitives';
import { colors, radius } from '@/theme';

const CODE_LENGTH = 6;
const PREVIEW_CODE = '123456';

export default function OTP() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const refs = useRef<(TextInput | null)[]>([]);
  const code = digits.join('');

  const verify = (value = code) => {
    if (value !== PREVIEW_CODE) return;
    Keyboard.dismiss();
    refs.current.forEach((input) => input?.blur());
    router.replace('/dashboard');
  };

  const setDigit = (value: string, index: number) => {
    const entered = value.replace(/\D/g, '');
    const next = [...digits];

    if (!entered) {
      next[index] = '';
      setDigits(next);
      return;
    }

    entered.slice(0, CODE_LENGTH - index).split('').forEach((digit, offset) => {
      next[index + offset] = digit;
    });
    setDigits(next);

    const nextEmpty = next.findIndex((digit, position) => position > index && !digit);
    if (nextEmpty >= 0) {
      refs.current[nextEmpty]?.focus();
    } else {
      refs.current[index]?.blur();
      Keyboard.dismiss();
    }
  };

  const handleBackspace = (index: number) => {
    if (!digits[index] && index > 0) refs.current[index - 1]?.focus();
  };

  return <Page scroll={false}>
    <Header onBack={() => router.back()} title="Verify your email" subtitle={`We sent a 6-digit code to ${email}. Enter it below to save your plan.`}/>
    <View style={s.code}>{digits.map((digit, index) => <TextInput
      key={index}
      ref={(input) => { refs.current[index] = input; }}
      value={digit}
      onChangeText={(value) => setDigit(value, index)}
      onKeyPress={({ nativeEvent }) => { if (nativeEvent.key === 'Backspace') handleBackspace(index); }}
      onSubmitEditing={() => verify()}
      keyboardType="number-pad"
      inputMode="numeric"
      returnKeyType={index === CODE_LENGTH - 1 ? 'done' : 'next'}
      selectTextOnFocus
      textContentType="oneTimeCode"
      autoComplete="one-time-code"
      accessibilityLabel={`Verification code digit ${index + 1}`}
      style={[s.cell, digit && s.cellOn]}
    />)}</View>
    <Text style={s.demo}>Preview code: <Text style={{fontWeight:'900'}}>{PREVIEW_CODE}</Text></Text>
    <Button label="Verify and enter app" icon="checkmark" disabled={code !== PREVIEW_CODE} onPress={() => verify()}/>
    <Pressable onPress={() => refs.current[0]?.focus()}><Text style={s.resend}>Did not receive it? <Text style={{color:colors.primary,fontWeight:'900'}}>Resend code</Text></Text></Pressable>
  </Page>;
}
const s=StyleSheet.create({code:{flexDirection:'row',gap:7,marginVertical:28},cell:{flex:1,aspectRatio:.82,borderRadius:radius.md,backgroundColor:colors.surface,borderWidth:1.5,borderColor:colors.line,textAlign:'center',fontSize:22,fontWeight:'900',color:colors.ink},cellOn:{borderColor:colors.primary,backgroundColor:colors.surfaceAlt},demo:{fontSize:11,color:colors.muted,textAlign:'center',marginBottom:18},resend:{fontSize:12,color:colors.muted,textAlign:'center',marginTop:20}});
