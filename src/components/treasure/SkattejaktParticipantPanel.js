import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";

const REFERANSE_BREDDE = 876;

function DirectionIcon({ size, color }) {
  const stroke = Math.max(2, Math.round(size * 0.08));
  const arm = Math.round(size * 0.28);

  return (
    <View style={[styles.directionIcon, { width: size, height: size }]}> 
      <View style={[styles.directionVertical, { width: stroke, height: size * 0.72, backgroundColor: color }]} />
      <View style={[styles.directionHorizontal, { width: size * 0.72, height: stroke, backgroundColor: color }]} />
      <View style={[styles.arrowUp, { borderLeftWidth: arm * 0.36, borderRightWidth: arm * 0.36, borderBottomWidth: arm * 0.52, borderBottomColor: color }]} />
      <View style={[styles.arrowDown, { borderLeftWidth: arm * 0.36, borderRightWidth: arm * 0.36, borderTopWidth: arm * 0.52, borderTopColor: color }]} />
      <View style={[styles.arrowLeft, { borderTopWidth: arm * 0.36, borderBottomWidth: arm * 0.36, borderRightWidth: arm * 0.52, borderRightColor: color }]} />
      <View style={[styles.arrowRight, { borderTopWidth: arm * 0.36, borderBottomWidth: arm * 0.36, borderLeftWidth: arm * 0.52, borderLeftColor: color }]} />
    </View>
  );
}

function PersonIcon({ size, color, outlined = false }) {
  const head = Math.round(size * 0.28);
  return (
    <View style={[styles.personIcon, { width: size, height: size }]}> 
      <View
        style={[
          styles.personHead,
          {
            width: head,
            height: head,
            borderRadius: head / 2,
            backgroundColor: outlined ? "transparent" : color,
            borderWidth: outlined ? Math.max(2, Math.round(size * 0.045)) : 0,
            borderColor: color
          }
        ]}
      />
      <View
        style={[
          styles.personBody,
          {
            width: Math.round(size * 0.62),
            height: Math.round(size * 0.32),
            borderTopLeftRadius: Math.round(size * 0.28),
            borderTopRightRadius: Math.round(size * 0.28),
            backgroundColor: outlined ? "transparent" : color,
            borderWidth: outlined ? Math.max(2, Math.round(size * 0.045)) : 0,
            borderColor: color
          }
        ]}
      />
    </View>
  );
}

function GroupIcon({ size, color }) {
  const stroke = Math.max(2, Math.round(size * 0.045));
  const head = Math.round(size * 0.23);
  return (
    <View style={[styles.groupIcon, { width: size, height: size }]}> 
      <View style={[styles.groupHead, { left: size * 0.14, width: head, height: head, borderRadius: head / 2, borderWidth: stroke, borderColor: color }]} />
      <View style={[styles.groupHead, { right: size * 0.14, width: head, height: head, borderRadius: head / 2, borderWidth: stroke, borderColor: color }]} />
      <View style={[styles.groupBody, { left: size * 0.06, width: size * 0.48, height: size * 0.30, borderWidth: stroke, borderColor: color, borderRadius: size * 0.16 }]} />
      <View style={[styles.groupBody, { right: size * 0.06, width: size * 0.48, height: size * 0.30, borderWidth: stroke, borderColor: color, borderRadius: size * 0.16 }]} />
    </View>
  );
}

function CheckBadge({ size }) {
  return (
    <View style={[styles.checkBadge, { width: size, height: size, borderRadius: size / 2 }]}> 
      <Text style={[styles.checkText, { fontSize: size * 0.70, lineHeight: size * 0.76 }]}>✓</Text>
    </View>
  );
}

function Choice({ selected, title, icon, onPress, m }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.86}
      style={[
        styles.choice,
        {
          width: m.choiceWidth,
          height: m.choiceHeight,
          borderRadius: m.choiceRadius,
          borderWidth: m.borderWidth
        },
        selected ? styles.choiceSelected : styles.choiceInactive
      ]}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`${title}, ${selected ? "valgt" : "ikke valgt"}`}
    >
      {selected ? <View pointerEvents="none" style={styles.selectedGlow} /> : null}
      <View style={[styles.choiceIconWrap, { width: m.choiceIconBox }]}>
        {icon === "person" ? (
          <PersonIcon size={m.choiceIconSize} color={selected ? "#061426" : "#94A3B8"} />
        ) : (
          <GroupIcon size={m.choiceIconSize} color="#94A3B8" />
        )}
      </View>
      <Text
        allowFontScaling
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.88}
        style={[
          styles.choiceTitle,
          {
            fontSize: m.choiceFontSize,
            lineHeight: m.choiceLineHeight,
            color: selected ? "#061426" : "#E2E8F0"
          }
        ]}
      >
        {title}
      </Text>
      {selected ? (
        <View style={[styles.badgePosition, { top: m.badgeTop, right: m.badgeRight }]}>
          <CheckBadge size={m.badgeSize} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default function SkattejaktParticipantPanel({ value, onChange }) {
  const { width } = useWindowDimensions();

  const m = useMemo(() => {
    const base = Math.min(width, REFERANSE_BREDDE);
    const scale = base / REFERANSE_BREDDE;
    const u = (value) => Math.round(value * scale);

    return {
      panelWidth: u(819),
      panelHeight: u(306),
      panelRadius: u(25),
      borderWidth: Math.max(1, u(2)),
      iconLeft: u(39),
      iconTop: u(33),
      iconSize: u(58),
      titleLeft: u(126),
      titleTop: u(47),
      titleWidth: u(240),
      titleSize: Math.max(16, u(32)),
      titleLine: Math.max(21, u(38)),
      choicesTop: u(116),
      leftChoiceLeft: u(34),
      rightChoiceLeft: u(439),
      choiceWidth: u(347),
      choiceHeight: u(156),
      choiceRadius: u(19),
      choiceIconBox: u(118),
      choiceIconSize: u(72),
      choiceFontSize: Math.max(16, u(31)),
      choiceLineHeight: Math.max(21, u(37)),
      badgeSize: u(46),
      badgeTop: u(16),
      badgeRight: u(16)
    };
  }, [width]);

  return (
    <View
      style={[
        styles.panel,
        {
          width: m.panelWidth,
          height: m.panelHeight,
          borderRadius: m.panelRadius,
          borderWidth: m.borderWidth
        }
      ]}
    >
      <View style={{ position: "absolute", left: m.iconLeft, top: m.iconTop }}>
        <DirectionIcon size={m.iconSize} color="#F59E0B" />
      </View>

      <Text
        allowFontScaling
        numberOfLines={1}
        style={[
          styles.panelTitle,
          {
            left: m.titleLeft,
            top: m.titleTop,
            width: m.titleWidth,
            fontSize: m.titleSize,
            lineHeight: m.titleLine
          }
        ]}
      >
        Valg
      </Text>

      <View style={[styles.choicePosition, { left: m.leftChoiceLeft, top: m.choicesTop }]}>
        <Choice
          selected={value === "alene"}
          title="Spill alene"
          icon="person"
          onPress={() => onChange("alene")}
          m={m}
        />
      </View>

      <View style={[styles.choicePosition, { left: m.rightChoiceLeft, top: m.choicesTop }]}>
        <Choice
          selected={value === "venner"}
          title="Spill med venner"
          icon="group"
          onPress={() => onChange("venner")}
          m={m}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "relative",
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "rgba(4, 19, 40, 0.84)",
    borderColor: "rgba(112, 101, 91, 0.66)",
    shadowColor: "#000000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3
  },
  panelTitle: {
    position: "absolute",
    color: "#E2E8F0",
    fontWeight: "700",
    letterSpacing: -0.25
  },
  choicePosition: {
    position: "absolute"
  },
  choice: {
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center"
  },
  choiceSelected: {
    backgroundColor: "#FF6B35",
    borderColor: "rgba(245, 158, 11, 0.90)",
    shadowColor: "#FF6B35",
    shadowOpacity: 0.40,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5
  },
  choiceInactive: {
    backgroundColor: "rgba(7, 24, 47, 0.94)",
    borderColor: "rgba(112, 101, 91, 0.58)"
  },
  selectedGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 183, 77, 0.12)"
  },
  choiceIconWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  choiceTitle: {
    flex: 1,
    paddingRight: 18,
    fontWeight: "600",
    letterSpacing: -0.2
  },
  badgePosition: {
    position: "absolute"
  },
  checkBadge: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#061426",
    shadowColor: "#000000",
    shadowOpacity: 0.28,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  checkText: {
    color: "#F59E0B",
    fontWeight: "700",
    textAlign: "center"
  },
  directionIcon: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  directionVertical: {
    position: "absolute"
  },
  directionHorizontal: {
    position: "absolute"
  },
  arrowUp: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  arrowDown: {
    position: "absolute",
    bottom: 0,
    width: 0,
    height: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  },
  arrowLeft: {
    position: "absolute",
    left: 0,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  arrowRight: {
    position: "absolute",
    right: 0,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  personIcon: {
    alignItems: "center",
    justifyContent: "center"
  },
  personHead: {
    marginBottom: 6
  },
  personBody: {},
  groupIcon: {
    position: "relative"
  },
  groupHead: {
    position: "absolute",
    top: 4
  },
  groupBody: {
    position: "absolute",
    bottom: 5
  }
});
