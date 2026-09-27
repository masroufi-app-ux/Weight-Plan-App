import { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '@/theme';
export default function Splash() {
  const [scale] = useState(() => new Animated.Value(.7));
  const [opacity] = useState(() => new Animated.Value(0));
  useEffect(() => { Animated.parallel([Animated.spring(scale,{toValue:1,useNativeDriver:true,friction:5}),Animated.timing(opacity,{toValue:1,duration:600,useNativeDriver:true})]).start(); const timer=setTimeout(()=>router.replace('/welcome'),1800); return()=>clearTimeout(timer); },[opacity,scale]);
  return <LinearGradient colors={[colors.primaryDark,'#2D9068']} style={styles.container}><Animated.View style={[styles.logo,{opacity,transform:[{scale}]}]}><Ionicons name="leaf" size={48} color={colors.primaryDark}/></Animated.View><Animated.Text style={[styles.name,{opacity}]}>WEIGHT PLAN</Animated.Text><Animated.Text style={[styles.tagline,{opacity}]}>A healthier plan, made for your life.</Animated.Text></LinearGradient>;
}
const styles=StyleSheet.create({container:{flex:1,alignItems:'center',justifyContent:'center'},logo:{width:96,height:96,borderRadius:32,backgroundColor:colors.lime,alignItems:'center',justifyContent:'center',marginBottom:22},name:{color:colors.white,fontWeight:'900',letterSpacing:2.4,fontSize:22},tagline:{color:'#D6EEE4',fontSize:14,marginTop:8}});
