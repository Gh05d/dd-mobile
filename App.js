/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { StyleSheet, View, Animated, Text, Button } from "react-native";

class App extends React.Component {
  state = {
    einleitung: [
      "Sorry Jungs",
      "Tut mir leid Mädels",
      "Oops",
      "Oh...",
      "Ach je",
      "Sorry, hab die Nachricht jetzt erst gelesen",
      "Sorry Jungs, kann heute nicht"
    ],
    entschuldigung: [
      "Ich hab völlig verpennt",
      "Ich hab verschwitzt",
      "Mir ist entfallen",
      "Ich hab nicht bedacht",
      "Ich hab völlig vergessen",
      "Mir war nicht klar",
      "Mir ist dazwischen gekommen",
      "Ich hab verpeilt",
      "Ich hab grad festgestellt"
    ],
    ausrede: [
      "Desi's Hamster gestorben ist",
      "Desi's Kaninchen gestorben ist",
      "Desi's Meerschweinchen gestorben ist",
      "Ich morgen Fotoshooting mit der Family hab",
      "eine meiner 5.000 Nichten morgen getauft wird",
      "meine Oma zum fünften mal in diesem Jahr gestorben ist",
      "Morgen Heilige drei Könige ist und wir das immer feiern",
      "mein Auto keinen Sprit mehr hat",
      "mein Auto nicht angesprungen ist",
      "mein Vater mir mein Auto nicht gegeben hat",
      "morgen der Jahrestag von Desi's totem Hamster ist",
      "morgen der Jahrestag von Desi's totem Kaninchen ist",
      "morgen der Jahrestag von Desi's totem Meerschweinchen ist",
      "Ich meine Tage habe",
      "dass ich mit den Jungs in Schottland Röcke anprobieren bin",
      "dass ich mir beim Anstehen vor der Disco die Bänder gerissen hab",
      "Ich dein Handy meinem Neffen geschenkt habe",
      "mein neugekauftes und von meinem Schwager generalüberholtes Auto zum dritten Mal in dieser Woche in der Werkstatt ist",
      "mein Auspuff schon wieder abgefallen ist. Dabei steht Peugeot doch für echte französische Wertarbeit",
      "Ich übrigens doch nicht zu meinem eigenen Geburtstag kommen kann. Kann mir das feiern doch nicht leisten. Die Geschenke könnt ihr mir ja bei Gelegenheit geben",
      "dass ich doch nicht zum Fußball kommen kann. Mir ist aufgefallen dass ich mich dafür bewegen müsste. Das ist mir nach einem anstrengenden Tag World of Warcraft zu viel",
      "dass Fußball doch heute nichts wird. Hab grade gemerkt dass Ich zu fett dafür bin",
      "dass ich 9 Millionen für Gbamin geboten habe. Ich wollte nur 990.000 bieten! Aber ihr könnt mir ja sicher mein Geld zurück geben. Ansonsten kann ich leider nicht kommen, weil ich jetzt pleite bin",
      "dass Ich heute doch nicht The Walking Dead gucken kommen kann. Desi will lieber was lebensbejahendes schauen. Aber sie sagt dass sie die Serie sehr interessant findet",
      "heut gar keine Postkutsche mehr fährt. Das ist jetzt blöd",
      "Ich mir den Urlaub ja doch gar nicht leisten kann. Gut, dass mir das einen Tag vor Abreise noch eingefallen ist"
    ],
    vertroestung: [
      "Aber das nächste mal bin ich auf jeden Fall am Start",
      "Aber wir sehen uns ja nächste Woche",
      "Aber das passiert sicher nicht nochmal",
      "Sorry, das konnte ich aber echt vorher nicht wissen",
      "Sorry, aber dafür kann ich wirklich nichts",
      "Nächstes mal bin ich auf jeden Fall dabei",
      "Jetzt ist es leider zu spät"
    ],
    excuse: null,
    fadeAnim: new Animated.Value(0),
    scaleAnim: new Animated.Value(1)
  };

  generateExcuse = () => {
    const { einleitung, entschuldigung, ausrede, vertroestung } = this.state;

    let eins = einleitung[Math.floor(Math.random() * einleitung.length)];
    let zwei =
      entschuldigung[Math.floor(Math.random() * entschuldigung.length)];
    let drei = ausrede[Math.floor(Math.random() * ausrede.length)];
    let vier = vertroestung[Math.floor(Math.random() * vertroestung.length)];

    this.setState({ excuse: `${eins}, ${zwei}, dass ${drei}. ${vier}!` });

    if (!this.state.excuse) {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 1000 // Make it take a while
        }
      ).start();
    } else {
      Animated.sequence([
        Animated.spring(this.state.scaleAnim, {
          toValue: 1.5,
          bounciness: 2,
          speed: 40,
          useNativeDriver: true
        }),
        Animated.spring(this.state.scaleAnim, {
          toValue: 1,
          bounciness: 10,
          speed: 40,
          useNativeDriver: true
        })
      ]).start();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Doppelkinn-Domme Ausredengenerator</Text>
        <Text>Just push the Button to let Domme speak</Text>
        {this.state.excuse && (
          <Animated.View
            style={{
              ...styles.dommeTalk,
              transform: [{ scale: this.state.scaleAnim }]
            }}>
            <Text style={styles.domme}>Domme:</Text>
            <Animated.View
              style={{
                opacity: this.state.fadeAnim
              }}>
              <Text style={styles.excuse}>{this.state.excuse}</Text>
            </Animated.View>
          </Animated.View>
        )}

        <View style={styles.button}>
          <Button
            color="purple"
            onPress={this.generateExcuse}
            title="Make Domme speak"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    fontFamily: "Roboto"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    padding: 10,
    textAlign: "center",
    backgroundColor: "pink"
  },
  dommeTalk: {
    backgroundColor: "#ffdab9",
    paddingTop: 10,
    paddingBottom: 10
  },
  domme: {
    paddingLeft: 5,
    color: "#ff4500",
    fontStyle: "italic"
  },
  excuse: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20
  },
  button: {
    marginBottom: 40
  }
});

export default App;
