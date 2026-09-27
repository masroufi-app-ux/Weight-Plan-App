import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Modal, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow } from '@/theme';

const ITEM_WIDTH = 64;

type Props = {
  label: string;
  value: string;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  min: number;
  max: number;
  step?: number;
  onChange: (value: string) => void;
};

export function MetricPicker({ label, value, unit, icon, min, max, step = 1, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const railRef = useRef<ScrollView | null>(null);
  const initialScrollX = useRef(0);
  const [translateY] = useState(() => new Animated.Value(520));
  const values = useMemo(() => {
    const count = Math.round((max - min) / step);
    return Array.from({ length: count + 1 }, (_, index) => Number((min + index * step).toFixed(1)));
  }, [max, min, step]);
  const selected = Number(value) || min;
  const selectedIndex = Math.max(0, Math.min(values.length - 1, Math.round((selected - min) / step)));

  useEffect(() => {
    if (!open) return;
    translateY.setValue(520);
    Animated.spring(translateY, { toValue: 0, damping: 24, stiffness: 230, mass: .9, useNativeDriver: true }).start();
  }, [open, translateY]);

  useEffect(() => {
    if (!open || !viewportWidth) return;
    railRef.current?.scrollTo({ x: initialScrollX.current, animated: false });
  }, [open, viewportWidth]);

  const openPicker = () => {
    initialScrollX.current = selectedIndex * ITEM_WIDTH;
    setOpen(true);
  };

  const close = () => {
    Animated.timing(translateY, { toValue: 520, duration: 190, useNativeDriver: true }).start(() => setOpen(false));
  };

  const updateFromScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.max(0, Math.min(values.length - 1, Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH)));
    const next = values[index];
    if (next !== selected) onChange(String(next));
  };

  return <>
    <Pressable onPress={openPicker} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.icon}><Ionicons name={icon} size={19} color={colors.primary}/></View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}><Text style={styles.value}>{value}</Text><Text style={styles.unit}>{unit}</Text></View>
      <View style={styles.edit}><Ionicons name="chevron-down" size={15} color={colors.primary}/></View>
    </Pressable>

    <Modal visible={open} transparent animationType="none" onRequestClose={close}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={close}/>
        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={styles.handle}/>
          <View style={styles.sheetTop}>
            <View><Text style={styles.sheetEyebrow}>PERSONAL DETAILS</Text><Text style={styles.sheetTitle}>Choose your {label.toLowerCase()}</Text></View>
            <Pressable onPress={close} style={styles.close}><Ionicons name="close" size={20} color={colors.ink}/></Pressable>
          </View>
          <View style={styles.selectedValue}><Text style={styles.selectedNumber}>{selected}</Text><Text style={styles.selectedUnit}>{unit}</Text></View>
          <View style={styles.wheelFrame} onLayout={({ nativeEvent }) => setViewportWidth(nativeEvent.layout.width)}>
            <View pointerEvents="none" style={styles.centerMarker}/>
            <ScrollView
              ref={railRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_WIDTH}
              snapToAlignment="center"
              decelerationRate="fast"
              scrollEventThrottle={16}
              onScroll={updateFromScroll}
              contentContainerStyle={{ paddingHorizontal: Math.max(0, viewportWidth / 2 - ITEM_WIDTH / 2) }}
            >
              {values.map((item) => {
                const active = item === selected;
                return <View key={item} style={styles.wheelItem}>
                  <Text style={[styles.wheelNumber, active && styles.wheelNumberOn]}>{item}</Text>
                  <View style={[styles.tick, active && styles.tickOn]}/>
                </View>;
              })}
            </ScrollView>
          </View>
          <View style={styles.hint}><Ionicons name="swap-horizontal" size={16} color={colors.primary}/><Text style={styles.hintText}>Swipe — the centered number is selected automatically</Text></View>
          <Pressable onPress={close} style={styles.done}><Text style={styles.doneText}>Done</Text><Ionicons name="checkmark" size={18} color={colors.white}/></Pressable>
        </Animated.View>
      </View>
    </Modal>
  </>;
}

const styles = StyleSheet.create({
  card: { flex: 1, minHeight: 138, minWidth: 0, padding: 15, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow },
  pressed: { transform: [{ scale: .985 }] },
  icon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: .8, color: colors.muted, textTransform: 'uppercase' },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 3 },
  value: { fontSize: 26, fontWeight: '900', letterSpacing: -.8, color: colors.ink },
  unit: { fontSize: 11, fontWeight: '800', color: colors.muted, paddingBottom: 4 },
  edit: { position: 'absolute', right: 13, top: 13, width: 28, height: 28, borderRadius: 14, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' },
  backdrop: { flex: 1, backgroundColor: 'rgba(8,20,15,.46)', justifyContent: 'flex-end' },
  sheet: { width: '100%', maxWidth: 620, alignSelf: 'center', backgroundColor: colors.cream, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 22, paddingBottom: 26, ...shadow },
  handle: { width: 44, height: 5, borderRadius: 4, backgroundColor: colors.line, alignSelf: 'center', marginTop: 10, marginBottom: 22 },
  sheetTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetEyebrow: { fontSize: 9, fontWeight: '900', letterSpacing: 1.1, color: colors.primary },
  sheetTitle: { fontSize: 23, fontWeight: '900', color: colors.ink, letterSpacing: -.6, marginTop: 4 },
  close: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  selectedValue: { alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginTop: 22, marginBottom: 16 },
  selectedNumber: { fontSize: 58, fontWeight: '900', letterSpacing: -2.5, color: colors.ink },
  selectedUnit: { fontSize: 16, fontWeight: '800', color: colors.primary, paddingBottom: 9 },
  wheelFrame: { height: 100, overflow: 'hidden', justifyContent: 'center' },
  centerMarker: { position: 'absolute', left: '50%', marginLeft: -30, width: 60, height: 84, borderRadius: 18, backgroundColor: colors.surfaceAlt, borderWidth: 1.5, borderColor: colors.primary },
  wheelItem: { width: ITEM_WIDTH, height: 90, alignItems: 'center', justifyContent: 'center' },
  wheelNumber: { fontSize: 17, fontWeight: '800', color: '#AAB4AF' },
  wheelNumberOn: { fontSize: 25, color: colors.primaryDark, fontWeight: '900' },
  tick: { width: 2, height: 13, borderRadius: 2, backgroundColor: colors.line, marginTop: 9 },
  tickOn: { height: 20, width: 3, backgroundColor: colors.primary },
  hint: { alignSelf: 'center', flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 7 },
  hintText: { fontSize: 10, color: colors.muted, fontWeight: '700' },
  done: { height: 52, marginTop: 20, borderRadius: radius.md, backgroundColor: colors.primary, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' },
  doneText: { color: colors.white, fontWeight: '900', fontSize: 14 },
});
