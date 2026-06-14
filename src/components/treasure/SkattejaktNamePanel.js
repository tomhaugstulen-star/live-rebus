import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from "react-native";

const REFERANSE_BREDDE = 876;

function TreasureChestIcon({ size, color }) {
  const stroke = Math.max(2, Math.round(size * 0.07));
  const bodyWidth = Math.round(size * 0.72);
  const bodyHeight = Math.round(size * 0.43);
  const lidHeight = Math.round(size * 0.22);
  const lockSize = Math.round(size * 0.18);

  return (
    <View style={[styles.chestIcon, { width: size, height: size }]}> 
      <View
        style={[
          styles.chestLid,
          {
            width: bodyWidth,
            height: lidHeight,
            borderWidth: stroke,
            borderColor: color,
            borderBottomWidth: 0,
            borderTopLeftRadius: Math.round(size * 0.12),
            borderTopRightRadius: Math.round(size * 0.12)
          }
        ]}
      >
        <View
          style={[
            styles.chestHandle,
            {
              width: Math.round(size * 0.28),
              height: Math.round(size * 0.12),
              borderWidth: stroke,
              borderColor: color,
              borderBottomWidth: 0,
              borderTopLeftRadius: Math.round(size * 0.07),
              borderTopRightRadius: Math.round(size * 0.07)
            }
          ]}
        />
      </View>

      <View
        style={[
          styles.chestBody,
          {
            width: bodyWidth,
            height: bodyHeight,
            borderWidth: stroke,
            borderColor: color,
            borderBottomLeftRadius: Math.round(size * 0.09),
            borderBottomRightRadius: Math.round(size * 0.09)
          }
        ]}
      >
        <View
          style={[
            styles.chestBand,
            {
              width: stroke,
              backgroundColor: color
            }
          ]}
        />
        <View
          style={[
            styles.chestLock,
            {
              width: lockSize,
              height: lockSize,
              borderWidth: stroke,
              borderColor: color,
              borderRadius: Math.round(lockSize * 0.2)
            }
          ]}
        />
      </View>
    </View>
  );
}

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
      <View style={{ position: "absolute", left: m.iconLeft, top: m.iconTop }}>
        <TreasureChestIcon size={m.iconSize} color="#F59E0B" />
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
          placeholderTextColor="#94A3B8"
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
          <PencilOutlineIcon size={m.editSize} color="#94A3B8" />
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
    backgroundColor: "rgba(4, 19, 40, 0.84)",
    borderColor: "rgba(112, 101, 91, 0.66)",
    shadowColor: "#000000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3
  },
  chestIcon: {
    alignItems: "center",
    justifyContent: "center"
  },
  chestLid: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  chestHandle: {
    position: "absolute",
    top: -1
  },
  chestBody: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  chestBand: {
    position: "absolute",
    top: 0,
    bottom: 0
  },
  chestLock: {
    backgroundColor: "rgba(4, 19, 40, 0.84)"
  },
  title: {
    position: "absolute",
    color: "#E2E8F0",
    fontWeight: "700",
    letterSpacing: -0.25
  },
  inputWrap: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "rgba(7, 24, 47, 0.94)",
    borderColor: "rgba(112, 101, 91, 0.58)",
    justifyContent: "center"
  },
  input: {
    width: "100%",
    height: "100%",
    color: "#E2E8F0",
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
