import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AreaCheckScreen({ onBack, onContinue }) {
  const checklistRows = [
    "Nok plass i området",
    "Ikke for nær hovedvei",
    "Ikke over vann",
    "GPS-dekning virker stabil",
    "Innenfor valgt radius"
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.headerBack}
            accessibilityRole="button"
            accessibilityLabel="Tilbake"
          >
            <Text style={styles.headerBackText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Områdesjekk</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.previewCard}>
          <View style={styles.previewMap}>
            <View style={styles.previewGlowOne} />
            <View style={styles.previewGlowTwo} />
            <View style={styles.previewRoadOne} />
            <View style={styles.previewRoadTwo} />
            <View style={styles.previewWater} />
            <View style={styles.previewRadiusRing} />
            <View style={styles.previewRadiusFill} />
            <View style={styles.previewCenterMarker}>
              <View style={styles.previewCenterCore} />
            </View>
            <View style={styles.previewUserDot} />
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Text style={styles.statusIconText}>✓</Text>
          </View>
          <View style={styles.statusCopy}>
            <Text style={styles.statusTitle}>Området virker egnet</Text>
            <Text style={styles.statusBody}>
              Vi har sjekket den valgte demo-sonen og funnet et trygt og
              egnet område for skattejakten.
            </Text>
          </View>
        </View>

        <View style={styles.checklistCard}>
          {checklistRows.map((item, index) => (
            <View
              key={item}
              style={[
                styles.checkRow,
                index === checklistRows.length - 1 && styles.checkRowLast
              ]}
            >
              <View style={styles.checkBullet}>
                <Text style={styles.checkBulletText}>✓</Text>
              </View>
              <Text style={styles.checkText}>{item}</Text>
              <View style={styles.infoBubble} accessibilityElementsHidden>
                <Text style={styles.infoBubbleText}>i</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Fortsett til sikkerhetsinfo"
        >
          <Text style={styles.primaryButtonText}>Fortsett til sikkerhetsinfo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0F172A"
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 28
  },
  header: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  headerBack: {
    width: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  headerBackText: {
    color: "#F59E0B",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 24
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#E2E8F0",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.2
  },
  headerSpacer: {
    width: 44
  },
  previewCard: {
    width: "100%",
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.16)",
    marginBottom: 14
  },
  previewMap: {
    height: 280,
    width: "100%",
    backgroundColor: "#0B1325",
    position: "relative",
    overflow: "hidden"
  },
  previewGlowOne: {
    position: "absolute",
    top: -48,
    left: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(245, 158, 11, 0.12)"
  },
  previewGlowTwo: {
    position: "absolute",
    right: -46,
    bottom: -42,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(14, 165, 233, 0.08)"
  },
  previewRoadOne: {
    position: "absolute",
    left: -30,
    top: 70,
    width: "120%",
    height: 14,
    backgroundColor: "rgba(51, 65, 85, 0.9)",
    transform: [{ rotate: "-13deg" }]
  },
  previewRoadTwo: {
    position: "absolute",
    right: -18,
    top: 168,
    width: "96%",
    height: 10,
    backgroundColor: "rgba(51, 65, 85, 0.7)",
    transform: [{ rotate: "10deg" }]
  },
  previewWater: {
    position: "absolute",
    right: 12,
    bottom: 18,
    width: 120,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(14, 165, 233, 0.18)",
    transform: [{ rotate: "-18deg" }]
  },
  previewRadiusRing: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 206,
    height: 206,
    marginLeft: -103,
    marginTop: -103,
    borderRadius: 103,
    borderWidth: 2,
    borderColor: "#F59E0B",
    backgroundColor: "rgba(245, 158, 11, 0.08)"
  },
  previewRadiusFill: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 140,
    height: 140,
    marginLeft: -70,
    marginTop: -70,
    borderRadius: 70,
    backgroundColor: "rgba(245, 158, 11, 0.09)"
  },
  previewCenterMarker: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 28,
    height: 28,
    marginLeft: -14,
    marginTop: -14,
    borderRadius: 14,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#1E293B"
  },
  previewCenterCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFF7ED"
  },
  previewUserDot: {
    position: "absolute",
    right: 48,
    top: 60,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#38BDF8",
    borderWidth: 3,
    borderColor: "#0F172A"
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 18,
    borderRadius: 24,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.22)",
    marginBottom: 14
  },
  statusIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34, 197, 94, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(34, 197, 94, 0.28)",
    marginRight: 14
  },
  statusIconText: {
    color: "#22C55E",
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 20
  },
  statusCopy: {
    flex: 1
  },
  statusTitle: {
    color: "#E2E8F0",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6
  },
  statusBody: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 22
  },
  checklistCard: {
    backgroundColor: "#1E293B",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.12)"
  },
  checkRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.12)",
    paddingVertical: 10
  },
  checkRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0
  },
  checkBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(245, 158, 11, 0.14)",
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.28)",
    marginRight: 12
  },
  checkBulletText: {
    color: "#F59E0B",
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 14
  },
  checkText: {
    flex: 1,
    color: "#E2E8F0",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600"
  },
  infoBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#334155",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.18)",
    marginLeft: 10
  },
  infoBubbleText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 14
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  primaryButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800"
  }
});
