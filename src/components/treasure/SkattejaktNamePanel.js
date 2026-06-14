import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from "react-native";

const REFERANSE_BREDDE = 876;
const SKATTEKISTE_IKON = require("../../../assets/images/treasure/icons/treasure-chest-icon.png");

function PencilOutlineIcon({ size, color }) {
  const stroke = Math.max(2, Math.round(size * 0.08));
  const shaftWidth = Math.round(size * 0.28);
  const shaftHeight = Math.round(size * 0.62);

  return (
    <View style={[styles.pencilIcon, { width: size, height: size }]}>
      <View
        style={[
          styles.pencilShaft,
          {
            width: shaftWidth,
            height: shaftHeight,
            borderWidth: stroke,
            borderColor: color,
            borderRadius: Math.max(2, Math.round(size * 0.04))
          }
        ]}
      />
      <View
        style={[
          styles.pencilTip,
          {
            borderLeftWidth: Math.round(shaftWidth * 0.45),
            borderRightWidth: Math.round(shaftWidth * 0.45),
            borderTopWidth: Math.round(size * 0.18),
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
      iconLeft: u(35),
      iconTop: u(34),
      iconSize: u(67),
      titleLeft: u(126),
      titleTop: u(48),
      titleWidth: u(430),
      titleSize: Math.max(16, u(32)),
      titleLine: Math.max(21, u(38)),
      inputLeft: u(34),
      inputTop: u(137),
      inputWidth: u(752),
      inputHeight: u(137),
      inputRadius: u(18),
      inputPaddingLeft: u(38),
      inputPaddingRight: u(84),
      inputFontSize: Math.max(17, u(34)),
      inputLineHeight: Math.max(22, u(42)),
      editRight: u(25),
      editSize: u(47),
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
      <View pointerEvents="none" style={styles.panelTone} />

      <Image
        source={SKATTEKISTE_IKON}
        resizeMode="contain"
        style={{
          position: "absolute",
          left: m.iconLeft,
          top: m.iconTop,
          width: m.iconSize,
          height: m.iconSize
        }}
      />

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
        <View pointerEvents="none" style={styles.inputTone} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="F.eks. Byjakten"
          placeholderTextColor="#7F90AE"
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
          <PencilOutlineIcon size={m.editSize} color="#A9B8D5" />
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
    backgroundColor: "rgba(3, 17, 36, 0.92)",
    borderColor: "rgba(116, 114, 111, 0.72)",
    shadowColor: "#000000",
    shadowOpacity: 0.32,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4
  },
  panelTone: {
    position: "absolute",
    top: "-56%",
    left: "-10%",
    width: "120%",
    height: "115%",
    borderRadius: 999,
    backgroundColor: "rgba(10, 26, 49, 0.78)"
  },
  title: {
    position: "absolute",
    color: "#F3F4F6",
    fontWeight: "700",
    letterSpacing: -0.25
  },
  inputWrap: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "rgba(7, 23, 45, 0.96)",
    borderColor: "rgba(116, 128, 146, 0.62)",
    justifyContent: "center"
  },
  inputTone: {
    position: "absolute",
    top: "-84%",
    left: "-10%",
    width: "120%",
    height: "150%",
    borderRadius: 999,
    backgroundColor: "rgba(16, 36, 62, 0.72)"
  },
  input: {
    width: "100%",
    height: "100%",
    color: "#F3F4F6",
    fontWeight: "500",
    letterSpacing: -0.15,
    paddingVertical: 0
  },
  editIconWrap: {
    position: "absolute",
    top: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  pencilIcon: {
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "45deg" }]
  },
  pencilShaft: {
    backgroundColor: "transparent"
  },
  pencilTip: {
    width: 0,
    height: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent"
  }
});