import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { PropsWithChildren, ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, shadow } from '@/theme';

export function Page({ children, scroll = true, style }: PropsWithChildren<{ scroll?: boolean; style?: ViewStyle }>) {
  const content = <View style={[styles.pageInner, style]}>{children}</View>;
  return <SafeAreaView style={styles.safe}>{scroll ? <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">{content}</ScrollView> : content}</SafeAreaView>;
}
export function Brand({ light = false }: { light?: boolean }) {
  return <View style={styles.brand}><View style={styles.brandIcon}><Ionicons name="leaf" size={19} color={colors.primaryDark} /></View><Text style={[styles.brandText, light && { color: colors.white }]}>WEIGHT PLAN</Text></View>;
}
export function Header({ title, subtitle, step, total, onBack }: { title: string; subtitle?: string; step?: number; total?: number; onBack?: () => void }) {
  return <View style={styles.header}><View style={styles.headerRow}>{onBack ? <Pressable style={styles.back} onPress={onBack}><Ionicons name="arrow-back" size={21} color={colors.ink} /></Pressable> : <View style={{ width: 42 }} />}{step && total ? <Text style={styles.stepText}>STEP {step} OF {total}</Text> : null}<View style={{ width: 42 }} /></View>{step && total ? <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${(step / total) * 100}%` }]} /></View> : null}<Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>;
}
export function Button({ label, onPress, secondary = false, disabled = false, icon }: { label: string; onPress: () => void; secondary?: boolean; disabled?: boolean; icon?: keyof typeof Ionicons.glyphMap }) {
  return <Pressable disabled={disabled} onPress={() => { if (Platform.OS !== 'web') Haptics.selectionAsync(); onPress(); }} style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, disabled && styles.disabled, pressed && { transform: [{ scale: .99 }] }]}><Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text>{icon ? <Ionicons name={icon} size={18} color={secondary ? colors.primary : colors.white} /> : null}</Pressable>;
}
export function Option({ title, description, selected, onPress, icon }: { title: string; description?: string; selected: boolean; onPress: () => void; icon?: keyof typeof Ionicons.glyphMap }) {
  return <Pressable onPress={onPress} style={[styles.option, selected && styles.optionSelected]}>{icon ? <View style={[styles.optionIcon, selected && styles.optionIconSelected]}><Ionicons name={icon} size={21} color={selected ? colors.white : colors.primary} /></View> : null}<View style={{ flex: 1 }}><Text style={styles.optionTitle}>{title}</Text>{description ? <Text style={styles.optionDescription}>{description}</Text> : null}</View><Ionicons name={selected ? 'checkmark-circle' : 'ellipse-outline'} size={23} color={selected ? colors.primary : colors.line} /></Pressable>;
}
export function Input({ label, suffix, ...props }: TextInputProps & { label: string; suffix?: string }) {
  return <View style={styles.inputWrap}><Text style={styles.inputLabel}>{label}</Text><View style={styles.inputBox}><TextInput {...props} placeholderTextColor="#9AA6A0" style={styles.input} />{suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}</View></View>;
}
export function InfoCard({ title, value, caption, icon, accent = false }: { title: string; value: string; caption?: string; icon: keyof typeof Ionicons.glyphMap; accent?: boolean }) {
  return <View style={[styles.infoCard, accent && { backgroundColor: colors.primary }]}><View style={[styles.smallIcon, accent && { backgroundColor: 'rgba(255,255,255,.16)' }]}><Ionicons name={icon} size={19} color={accent ? colors.white : colors.primary} /></View><Text style={[styles.cardLabel, accent && { color: '#D7EFE4' }]}>{title}</Text><Text style={[styles.cardValue, accent && { color: colors.white }]}>{value}</Text>{caption ? <Text style={[styles.cardCaption, accent && { color: '#D7EFE4' }]}>{caption}</Text> : null}</View>;
}
export function BottomBar({ children }: { children: ReactNode }) { return <View style={styles.bottom}>{children}</View>; }

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.cream }, scroll: { flexGrow: 1 }, pageInner: { width: '100%', maxWidth: 560, alignSelf: 'center', paddingHorizontal: 22, paddingTop: 8, paddingBottom: 34, flexGrow: 1 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 }, brandIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center' }, brandText: { fontWeight: '900', letterSpacing: 1.2, color: colors.ink, fontSize: 14 },
  header: { marginBottom: 22 }, headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 }, back: { width: 42, height: 42, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' }, stepText: { fontSize: 11, letterSpacing: 1.1, color: colors.muted, fontWeight: '800' },
  progressTrack: { height: 6, borderRadius: 6, backgroundColor: '#E1E7E2', overflow: 'hidden', marginBottom: 24 }, progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 6 }, title: { fontSize: 30, lineHeight: 36, letterSpacing: -1.1, fontWeight: '900', color: colors.ink, marginBottom: 7 }, subtitle: { fontSize: 15, lineHeight: 22, color: colors.muted },
  button: { minHeight: 56, borderRadius: radius.md, backgroundColor: colors.primary, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 }, buttonSecondary: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line }, buttonText: { color: colors.white, fontSize: 16, fontWeight: '800' }, buttonTextSecondary: { color: colors.primary }, disabled: { opacity: .45 },
  option: { minHeight: 72, borderRadius: radius.md, padding: 14, marginBottom: 11, backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', gap: 13 }, optionSelected: { borderColor: colors.primary, backgroundColor: colors.surfaceAlt }, optionIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' }, optionIconSelected: { backgroundColor: colors.primary }, optionTitle: { color: colors.ink, fontSize: 15, fontWeight: '800' }, optionDescription: { color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 2 },
  inputWrap: { marginBottom: 16, minWidth: 0 }, inputLabel: { color: colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 7 }, inputBox: { minHeight: 58, minWidth: 0, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 6 }, input: { flex: 1, minWidth: 0, color: colors.ink, fontSize: 18, fontWeight: '700' }, suffix: { flexShrink: 0, color: colors.muted, fontSize: 14, fontWeight: '700' },
  infoCard: { flex: 1, minWidth: 145, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, padding: 17, ...shadow }, smallIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginBottom: 13 }, cardLabel: { color: colors.muted, fontSize: 12, fontWeight: '700' }, cardValue: { color: colors.ink, fontSize: 24, fontWeight: '900', marginTop: 3 }, cardCaption: { color: colors.muted, fontSize: 11, marginTop: 3 }, bottom: { marginTop: 'auto', paddingTop: 24, gap: 10 },
});
