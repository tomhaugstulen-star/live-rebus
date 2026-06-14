import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from "react-native";

const REFERANSE_BREDDE = 876;

function SectionIcon({ size, color }) {
  const lineWidth = Math.max(2, Math.round(size * 0.08));
  const innerWidth = Math.round(size * 0.58);
  const innerHeight = Math.round(size * 0.48);
  const gap = Math.max(2, Math.round(size * 0.11));

  return (
    <View style={[styles.sectionIcon, { width: size, height: size }]}> 
      <View
        style={[
          styles.sectionIconFrame,
          {
            width: Math.round(size * 0.64),
            height: Math.round(size * 0.66),
            borderWidth: lineWidth,
            borderColor: color
          }
        ]}
      >
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={{
              width: innerWidth,
              height: lineWidth,
              marginTop: index === 0 ? 0 : gap,
              backgroundColor: color
            }}
          />
        ))}
      </View>
    </View>
  );
}

function EditIcon({ size, color }) {
  const shaftWidth = Math.max(5, Math.round(size * 0.25));
  const shaftHeight = Math.round(size * 0.66);

  return (
    <View style={[styles.editIcon, { width: size, height: size }]}> 
      <View
        style={[
          styles.editShaft,
          {
            width: shaftWidth,
            height: shaftHeight,
            borderRadius: Math.max(2, Math.round(shaftWidth * 0.2)),
            backgroundColor: color
          }
        ]}
      />
      <View
        style={[
          styles.editTip,
          {
            borderLeftWidth: Math.round(shaftWidth * 0.5),
            borderRightWidth: Math.round(shaftWidth * 0.5),
            borderTopWidth: Math.round(shaftWidth * 0.75),
            borderTopColor: color
          }
        ]}
      />
    </View>
  );
}

export default function SkattejaktNamePanel({ value, onChangeText }) {
  const { width } = useWindowDimensions();

  const m = useMemo(() => {
    const base = Math.min(width, REFERANSE_BREDDE);
    const scale = base / REFERANSE_BREDDE;
    const u = (value) => Math.round(value * scale);

    return {
      width: u(819),
      height: u(311),
      radius: u(25),
      iconLeft: u(39),
      iconTop: u(37),
      iconSize: u(61),
      titleLeft: u(122),
      titleTop: u(43),
      titleWidth: u(400),
      titleSize: Math.max(16, u(35)),
      titleLine: Math.max(21, u(40)),
      inputLeft: u(34),
      inputTop: u(137),
      inputWidth: u(752),
      inputHeight: u(137),
      inputRadius: u(18),
      inputPaddingLeft: u(38),
      inputPaddingRight: u(75),
      inputFontSize: Math.max(17, u(38)),
      inputLineHeight: Math.max(22, u(46)),
      editRight: u(24),
      editSize: u(53),
      borderWidth: Math.max(1, u(2))
    };
  }, [width]);

  return (
    <View
      style={[
        styles.panel,
        {
          width: m.width,
          height: m.height,
          borderRadius: m.radius,
          borderWidth: m.borderWidth
        }
      ]}
    >
      <View style={{ position: "absolute", left: m.iconLeft, top: m.iconTop }}>
        <SectionIcon size={m.iconSize} color="#F59E0B" />
      </View>

      <Text
        allowFontScaling
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.88}
        style={[
          styles.title,
          {
            left: m.titleLeft,
            top: m.titleTop,
            width: m.titleWidth,
            fontSize: m.titleSize,
            lineHeight: m.titleLine
          }
        ]}
      >
        Navn på skattejakten
      </Text>

      <View
        style={[
          styles.inputWrap,
          {
            left: m.inputLeft,
            top: m.inputTop,
            width: m.inputWidth,
            height: m.inputHeight,
            borderRadius: m.inputRadius,
            borderWidth: m.borderWidth
          }
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="F.eks. Byjakten"
          placeholderTextColor="#A9B8D5"
          style={[
            styles.input,
            {
              paddingLeft: m.inputPaddingLeft,
              paddingRight: m.inputPaddingRight,
              fontSize: m.inputFontSize,
              lineHeight: m.inputLineHeight
            }
          ]}
          maxLength={40}
          returnKeyType="done"
          autoCapitalize="sentences"
          allowFontScaling
          accessibilityLabel="Navn på skattejakten"
        />

        <View
          pointerEvents="none"
          style={[
            styles.editIconWrap,
            {
              right: m.editRight,
              width: m.editSize,
              height: m.editSize,
              marginTop: -Math.round(m.editSize / 2)
            }
          ]}
        >
          <EditIcon size={m.editSize} color="#A9B8D5" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "relative",
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "rgba(4, 19, 40, 0.96)",
    borderColor: "rgba(98, 95, 93, 0.74)",
    shadowColor: "#000000",
    shadowOpacity: 0.30,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4
  },
  sectionIcon: {
    alignItems: "center",
    justifyContent: "center"
  },
  sectionIconFrame: {
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    position: "absolute",
    color: "#F3F4F6",
    fontWeight: "700",
    letterSpacing: -0.3
  },
  inputWrap: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "#0A1A31",
    borderColor: "rgba(78, 90, 109, 0.95)",
    justifyContent: "center"
  },
  input: {
    width: "100%",
    height: "100%",
    color: "#F3F4F6",
    fontWeight: "500",
    letterSpacing: -0.2,
    paddingVertical: 0
  },
  editIconWrap: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  editIcon: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-45deg" }]
  },
  editShaft: {},
  editTip: {
    width: 0,
    height: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  }
});
