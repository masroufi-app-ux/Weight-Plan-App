import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Brand } from '@/components/Primitives';
import { colors, radius } from '@/theme';

export default function Welcome() {
  const { height } = useWindowDimensions();
  // Most modern phones are 700–950pt tall. Keep the full composition at those
  // sizes and only tighten individual details on genuinely short displays.
  const compact = height < 690;
  const artHeight = Math.round(Math.min(450, Math.max(compact ? 205 : 300, height * (compact ? 0.34 : 0.48))));
  return <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#10241D','#1F6048','#34795D']} start={{x:0,y:0}} end={{x:1,y:1}} style={[styles.shell,compact&&styles.shellCompact]}>
        <View style={styles.upper}>
          <View style={styles.top}><Brand light/><Pressable onPress={()=>router.push('/auth')} style={styles.loginChip}><Text style={styles.loginChipText}>Log in</Text><Ionicons name="arrow-forward" size={14} color={colors.white}/></Pressable></View>
          <View style={[styles.art,{height:artHeight},compact&&styles.artCompact]}>
            <View style={styles.sun}/><View style={styles.trackOne}/><View style={styles.trackTwo}/>
            <View style={[styles.metricCard,compact&&styles.metricCardCompact]}><Text style={styles.metricKicker}>TODAY</Text><Text style={[styles.metricValue,compact&&styles.metricValueCompact]}>7,240</Text><Text style={styles.metricCaption}>steps in your rhythm</Text><View style={[styles.metricLine,compact&&styles.metricLineCompact]}><View style={styles.metricFill}/></View></View>
            <View style={[styles.person,compact&&styles.personCompact]}><View style={[styles.personGlow,compact&&styles.personGlowCompact]}/><Ionicons name="walk" size={compact?78:112} color={colors.white}/></View>
            <View style={[styles.foodBadge,compact&&styles.foodBadgeCompact]}><Ionicons name="nutrition" size={compact?19:24} color={colors.primaryDark}/><View><Text style={styles.foodTitle}>Lebanese-first</Text><Text style={styles.foodText}>Food that feels familiar</Text></View></View>
            <View style={styles.spark}><Ionicons name="sparkles" size={18} color={colors.primaryDark}/></View>
          </View>
        </View>

        <View style={[styles.copy,compact&&styles.copyCompact]}>
          <View style={styles.eyebrow}><View style={styles.eyebrowDot}/><Text style={styles.eyebrowText}>A PLAN THAT MOVES WITH YOU</Text></View>
          <Text style={[styles.title,compact&&styles.titleCompact]}>Your goals.{`\n`}Your food.{`\n`}Your rhythm.</Text>
          <Text style={[styles.subtitle,compact&&styles.subtitleCompact]}>A personal nutrition journey built around your body, your activity and the meals you actually eat.</Text>
          <Pressable onPress={()=>router.push('/setup')} style={[styles.primary,compact&&styles.primaryCompact]}><Text style={styles.primaryText}>Build my plan</Text><View style={[styles.primaryIcon,compact&&styles.primaryIconCompact]}><Ionicons name="arrow-forward" size={19} color={colors.primaryDark}/></View></Pressable>
          <Pressable onPress={()=>router.push('/auth')} style={[styles.secondary,compact&&styles.secondaryCompact]}><Text style={styles.secondaryText}>I already have an account</Text></Pressable>
          <View style={styles.note}><Ionicons name="shield-checkmark" size={14} color="#BFD6CC"/><Text style={styles.noteText}>Takes about 3 minutes · Adjust anything later</Text></View>
        </View>
      </LinearGradient>
  </SafeAreaView>;
}

const styles=StyleSheet.create({
  safe:{flex:1,backgroundColor:'#10241D'},shell:{width:'100%',maxWidth:760,height:'100%',alignSelf:'center',paddingHorizontal:22,paddingTop:10,paddingBottom:16,overflow:'hidden',justifyContent:'space-between'},shellCompact:{paddingTop:6,paddingBottom:8},
  upper:{flexShrink:0},
  top:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',zIndex:2},loginChip:{height:40,borderRadius:14,borderWidth:1,borderColor:'rgba(255,255,255,.22)',paddingHorizontal:14,flexDirection:'row',alignItems:'center',gap:7,backgroundColor:'rgba(255,255,255,.08)'},loginChipText:{color:colors.white,fontSize:12,fontWeight:'800'},
  art:{flexShrink:0,marginTop:14,borderRadius:32,backgroundColor:'rgba(255,255,255,.08)',borderWidth:1,borderColor:'rgba(255,255,255,.12)',overflow:'hidden'},artCompact:{marginTop:8,borderRadius:25},sun:{position:'absolute',width:190,height:190,borderRadius:95,backgroundColor:'rgba(205,234,114,.2)',right:-28,top:-42},trackOne:{position:'absolute',width:330,height:170,borderRadius:170,borderWidth:1,borderColor:'rgba(255,255,255,.12)',right:-75,bottom:-100,transform:[{rotate:'-8deg'}]},trackTwo:{position:'absolute',width:260,height:140,borderRadius:140,borderWidth:1,borderColor:'rgba(205,234,114,.23)',right:-42,bottom:-80,transform:[{rotate:'-8deg'}]},metricCard:{position:'absolute',left:16,top:18,width:145,padding:15,borderRadius:20,backgroundColor:colors.white},metricCardCompact:{width:124,padding:11,top:12,left:12,borderRadius:16},metricKicker:{fontSize:8,fontWeight:'900',letterSpacing:1,color:colors.primary},metricValue:{fontSize:29,fontWeight:'900',letterSpacing:-1,color:colors.ink,marginTop:3},metricValueCompact:{fontSize:23},metricCaption:{fontSize:9,color:colors.muted},metricLine:{height:5,borderRadius:5,backgroundColor:colors.line,marginTop:12},metricLineCompact:{marginTop:6},metricFill:{width:'68%',height:'100%',borderRadius:5,backgroundColor:colors.primary},person:{position:'absolute',right:35,top:'24%',width:160,height:170,alignItems:'center',justifyContent:'center'},personCompact:{right:25,top:42,width:105,height:115},personGlow:{position:'absolute',width:138,height:138,borderRadius:69,backgroundColor:'rgba(205,234,114,.22)'},personGlowCompact:{width:96,height:96,borderRadius:48},foodBadge:{position:'absolute',left:16,bottom:18,minWidth:190,height:58,borderRadius:18,paddingHorizontal:13,backgroundColor:colors.lime,flexDirection:'row',alignItems:'center',gap:10},foodBadgeCompact:{left:12,bottom:10,minWidth:160,height:44,borderRadius:14,paddingHorizontal:10},foodTitle:{fontSize:11,fontWeight:'900',color:colors.primaryDark},foodText:{fontSize:9,color:colors.primaryDark,marginTop:2},spark:{position:'absolute',right:17,top:17,width:38,height:38,borderRadius:14,backgroundColor:colors.lime,alignItems:'center',justifyContent:'center'},
  copy:{zIndex:2,flexShrink:0},copyCompact:{},eyebrow:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:8},eyebrowDot:{width:7,height:7,borderRadius:4,backgroundColor:colors.lime},eyebrowText:{fontSize:9,fontWeight:'900',letterSpacing:1.2,color:'#C8DDD4'},title:{fontSize:40,lineHeight:40,fontWeight:'900',letterSpacing:-1.8,color:colors.white},titleCompact:{fontSize:31,lineHeight:31},subtitle:{maxWidth:520,fontSize:14,lineHeight:20,color:'#C4D5CE',marginTop:10,marginBottom:16},subtitleCompact:{fontSize:11,lineHeight:15,marginTop:6,marginBottom:8},primary:{height:56,borderRadius:radius.md,backgroundColor:colors.lime,paddingLeft:20,paddingRight:8,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},primaryCompact:{height:48},primaryText:{fontSize:15,fontWeight:'900',color:colors.primaryDark},primaryIcon:{width:41,height:41,borderRadius:14,backgroundColor:colors.white,alignItems:'center',justifyContent:'center'},primaryIconCompact:{width:35,height:35},secondary:{height:48,borderRadius:radius.md,borderWidth:1,borderColor:'rgba(255,255,255,.22)',alignItems:'center',justifyContent:'center',marginTop:8},secondaryCompact:{height:42,marginTop:6},secondaryText:{fontSize:13,fontWeight:'800',color:colors.white},note:{flexDirection:'row',gap:7,alignItems:'center',justifyContent:'center',marginTop:8},noteText:{fontSize:10,color:'#BFD6CC'},
});
