import { getSignalLevel } from "../../utils/geo";
import { theme } from "../../utils/theme";

function getIntervalByDistance(distance) {
  if (distance > 400) return null;
  if (distance > 200) return 2200;
  if (distance > 100) return 1400;
  if (distance > 50) return 850;
  return 450;
}

export default function RadarMode({ distance }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  const signal = useMemo(() => getSignalLevel(distance), [distance]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const interval = getIntervalByDistance(distance);
    if (!interval) return;

    timerRef.current = setInterval(async () => {
      try {
        if (distance <= 50) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        } else if (distance <= 100) {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      } catch {}

      pulseAnim.setValue(1);
      Animated.timing(pulseAnim, {
        toValue: 4,
        duration: Math.min(interval, 700),
        useNativeDriver: true
      }).start();
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [distance, pulseAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SONAR</Text>
      <Text style={styles.text}>
        Legg mobilen i lomma og følg signalet. Jo sterkere pulsen blir, jo nærmere er du.
      </Text>

      <View style={styles.radarWrap}>
        <Animated.View
          style={[
            styles.wave,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 4],
                outputRange: [0.65, 0]
              })
            }
          ]}
        />
        <View style={styles.circle4} />
        <View style={styles.circle3} />
        <View style={styles.circle2} />
        <View style={styles.core} />
      </View>

      <View style={styles.signalCard}>
        <Text style={styles.signalKicker}>SIGNAL</Text>
        <Text style={styles.signalValue}>{signal.label.toUpperCase()}</Text>
        <Text style={styles.signalHelper}>{signal.helper}</Text>
      </View>

      <Text style={styles.note}>
        Signalet vil automatisk øke i tempo når du nærmer deg skatten.
      </Text>
    </View>
  );
}

const radarCircle = {
  position: "absolute",
  borderWidth: 2,
  borderColor: "rgba(255, 107, 53, 0.6)",
  borderRadius: 999
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: theme.colors.background
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 8
  },
  text: {
    color: theme.colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 330
  },
  radarWrap: {
    width: 290,
    height: 290,
    marginTop: 34,
    marginBottom: 34,
    alignItems: "center",
    justifyContent: "center"
  },
  wave: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: "rgba(255, 107, 53, 0.10)",
    position: "absolute"
  },
  circle4: {
    ...radarCircle,
    width: 278,
    height: 278
  },
  circle3: {
    ...radarCircle,
    width: 212,
    height: 212
  },
  circle2: {
    ...radarCircle,
    width: 144,
    height: 144
  },
  core: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8
  },
  signalCard: {
    width: "100%",
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: 20
  },
  signalKicker: {
    color: theme.colors.textMuted,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 4
  },
  signalValue: {
    color: theme.colors.primary,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: "900"
  },
  signalHelper: {
    color: theme.colors.text,
    fontSize: 16,
    marginTop: 6
  },
  note: {
    color: theme.colors.textMuted,
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
    lineHeight: 21
  }
});