import { Ionicons } from '@expo/vector-icons';
import { useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow } from '@/theme';

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
  const railRef = useRef<ScrollView | null>(null);
  const values = useMemo(() => {
    const count = Math.round((max - min) / step);
    return Array.from({ length: count + 1 }, (_, index) => Number((min + index * step).toFixed(1)));
  }, [max, min, step]);

  const selected = Number(value) || min;
  const centerSelected = (viewportWidth: number) => {
    const selectedIndex = Math.round((selected - min) / step);
    const selectedCenter = 170 + selectedIndex * 42 + 21;
    railRef.current?.scrollTo({ x: Math.max(0, selectedCenter - viewportWidth / 2), animated: false });
  };
  const choose = (next: number) => {
    onChange(String(next));
    setOpen(false);
  };

  return <>
    <Pressable onPress={() => setOpen(true)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.icon}><Ionicons name={icon} size={19} color={colors.primary}/></View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}><Text style={styles.value}>{value}</Text><Text style={styles.unit}>{unit}</Text></View>
      <View style={styles.edit}><Ionicons name="chevron-down" size={15} color={colors.primary}/></View>
    </Pressable>
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
      <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
        <Pressable style={styles.sheet} onPress={() => undefined}>
          <View style={styles.handle}/>
          <View style={styles.sheetTop}>
            <View><Text style={styles.sheetEyebrow}>PERSONAL DETAILS</Text><Text style={styles.sheetTitle}>Choose your {label.toLowerCase()}</Text></View>
            <Pressable onPress={() => setOpen(false)} style={styles.close}><Ionicons name="close" size={20} color={colors.ink}/></Pressable>
          </View>
          <View style={styles.selectedValue}><Text style={styles.selectedNumber}>{selected}</Text><Text style={styles.selectedUnit}>{unit}</Text></View>
          <ScrollView ref={railRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail} onLayout={({ nativeEvent }) => centerSelected(nativeEvent.layout.width)}>
            {values.map((item) => {
              const active = item === selected;
              return <Pressable key={item} onPress={() => choose(item)} style={[styles.tickWrap, active && styles.tickWrapOn]}>
                <View style={[styles.tick, item % (step * 5) === 0 && styles.majorTick, active && styles.tickOn]}/>
                {(active || item % (step * 5) === 0) ? <Text style={[styles.tickText, active && styles.tickTextOn]}>{item}</Text> : null}
              </Pressable>;
            })}
          </ScrollView>
          <View style={styles.hint}><Ionicons name="swap-horizontal" size={16} color={colors.primary}/><Text style={styles.hintText}>Swipe the scale or tap a number</Text></View>
        </Pressable>
      </Pressable>
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
  backdrop: { flex: 1, backgroundColor: 'rgba(8,20,15,.42)', justifyContent: 'flex-end' },
  sheet: { width: '100%', maxWidth: 620, alignSelf: 'center', backgroundColor: colors.cream, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 22, paddingBottom: 30, ...shadow },
  handle: { width: 44, height: 5, borderRadius: 4, backgroundColor: colors.line, alignSelf: 'center', marginTop: 10, marginBottom: 22 },
  sheetTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sheetEyebrow: { fontSize: 9, fontWeight: '900', letterSpacing: 1.1, color: colors.primary },
  sheetTitle: { fontSize: 23, fontWeight: '900', color: colors.ink, letterSpacing: -.6, marginTop: 4 },
  close: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  selectedValue: { alignSelf: 'center', flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginVertical: 25 },
  selectedNumber: { fontSize: 56, fontWeight: '900', letterSpacing: -2.5, color: colors.ink },
  selectedUnit: { fontSize: 16, fontWeight: '800', color: colors.primary, paddingBottom: 9 },
  rail: { alignItems: 'flex-start', paddingHorizontal: 170, height: 86 },
  tickWrap: { width: 42, height: 76, alignItems: 'center', paddingTop: 8, borderRadius: 13 },
  tickWrapOn: { backgroundColor: colors.surfaceAlt },
  tick: { width: 2, height: 19, borderRadius: 2, backgroundColor: colors.line },
  majorTick: { height: 30, backgroundColor: colors.muted },
  tickOn: { height: 38, width: 3, backgroundColor: colors.primary },
  tickText: { fontSize: 10, color: colors.muted, marginTop: 5 },
  tickTextOn: { color: colors.primary, fontWeight: '900' },
  hint: { alignSelf: 'center', flexDirection: 'row', gap: 7, alignItems: 'center', marginTop: 12 },
  hintText: { fontSize: 11, color: colors.muted, fontWeight: '700' },
});
