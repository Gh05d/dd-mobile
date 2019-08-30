import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Linking
} from "react-native";
import FontAwesome, {
  RegularIcons,
  BrandIcons
} from "react-native-fontawesome";
import AsyncStorage from "@react-native-community/async-storage";

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
      "Desi's Katze zum Tierarzt muss, weil sie einen Zahn gezogen bekommt",
      "Ich meine Tage habe",
      "ich mit den Jungs in Schottland Röcke anprobieren bin",
      "ich mir beim Anstehen vor der Disco die Bänder gerissen hab",
      "Ich dein Handy meinem Neffen geschenkt habe",
      "Ich morgen früh den ganzen Tag Heartstone spielen wollte. Dafür muss ich fit sein",
      "mein neugekauftes und von meinem Schwager generalüberholtes Auto zum dritten Mal in dieser Woche in der Werkstatt ist",
      "mein Auspuff schon wieder abgefallen ist. Dabei steht Peugeot doch für echte französische Wertarbeit",
      "Ich übrigens doch nicht zu meinem eigenen Geburtstag kommen kann. Kann mir das feiern doch nicht leisten. Die Geschenke könnt ihr mir ja bei Gelegenheit geben",
      "ich doch nicht zum Fußball kommen kann. Mir ist aufgefallen dass ich mich dafür bewegen müsste. Das ist mir nach einem anstrengenden Tag World of Warcraft zu viel",
      "Fußball doch heute nichts wird. Hab grade gemerkt dass Ich zu fett dafür bin",
      "ich 9 Millionen für Gbamin geboten habe. Ich wollte nur 990.000 bieten! Aber ihr könnt mir ja sicher mein Geld zurück geben. Ansonsten kann ich leider nicht kommen, weil ich jetzt pleite bin",
      "Ich heute doch nicht The Walking Dead gucken kommen kann. Desi will lieber was lebensbejahendes schauen. Aber sie sagt dass sie die Serie sehr interessant findet",
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
    submitting: false,
    fadeAnim: new Animated.Value(0),
    scaleAnim: new Animated.Value(1),
    ownExcuses: [],
    newExcuse: ""
  };

  async componentDidMount() {
    try {
      const ownExcuses = await AsyncStorage.getItem("excuses");

      if (ownExcuses) {
        this.setState({ ownExcuses: JSON.parse(ownExcuses) });
      }
    } catch (err) {
      console.warn("Sorry, konnte eigene Ausreden nicht laden :-(");
    }
  }

  generateExcuse = ownExcuse => {
    const {
      einleitung,
      entschuldigung,
      ausrede,
      vertroestung,
      ownExcuses
    } = this.state;
    const percentage = Math.random() * 100;

    if (ownExcuse) {
      this.setState({ excuse: ownExcuse });
    } else if (ownExcuses && percentage > 80) {
      this.setState({
        excuse: ownExcuses[Math.floor(Math.random() * ownExcuses.length)]
      });
    } else {
      let eins = einleitung[Math.floor(Math.random() * einleitung.length)];
      let zwei =
        entschuldigung[Math.floor(Math.random() * entschuldigung.length)];
      let drei = ausrede[Math.floor(Math.random() * ausrede.length)];
      let vier = vertroestung[Math.floor(Math.random() * vertroestung.length)];

      this.setState({ excuse: `${eins}, ${zwei}, dass ${drei}. ${vier}!` });
    }

    if (!this.state.excuse || this.state.fadeAnim != 1) {
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

  saveOwnExcuse = async () => {
    try {
      const { newExcuse } = this.state;

      if (newExcuse) {
        await this.setState({ submitting: true });
        const ownExcuses = await AsyncStorage.getItem("excuses");
        let newExcuses = [];

        if (ownExcuses) {
          newExcuses = [...JSON.parse(ownExcuses), newExcuse];
        }

        await AsyncStorage.setItem("excuses", JSON.stringify(newExcuses));
        await this.setState({
          ownExcuses: JSON.stringify(newExcuses),
          newExcuse: "",
          submitting: false
        });

        this.generateExcuse(newExcuse);
      }
    } catch (err) {
      console.warn("Sorry, konnte die Ausrede nicht speichern :-(");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Doppelkinn-Domme Ausredengenerator</Text>
        <Text>Drück den Knopf um Domme labern zu lassen</Text>
        {this.state.excuse && (
          <React.Fragment>
            <Animated.View
              style={{
                ...styles.dommeTalk,
                transform: [{ scale: this.state.scaleAnim }]
              }}>
              <Text style={styles.domme}>Domme:</Text>
              <Animated.View style={{ opacity: this.state.fadeAnim }}>
                <Text style={styles.excuse}>{this.state.excuse}</Text>
              </Animated.View>

              <TouchableOpacity
                onPress={async () => {
                  try {
                    await Linking.openURL(
                      `whatsapp://send?text=${this.state.excuse}`
                    );
                  } catch (err) {
                    console.warn(
                      "Sorry, konnte nicht auf WhatsApp zugreifen :-("
                    );
                  }
                }}
                style={styles.whatsappContainer}>
                <FontAwesome
                  style={styles.whatsappIcon}
                  icon={BrandIcons.whatsapp}
                />
                <Text style={styles.whatsapp}>
                  Teile die Ausrede via WhatsApp
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </React.Fragment>
        )}

        <View>
          <Text>Füg deine eigene Ausrede hinzu</Text>
          <TextInput
            underlineColorAndroid="lightpink"
            disabled={this.state.submitting}
            placeholder="Sorry Mädels,..."
            onChangeText={newExcuse => this.setState({ newExcuse })}
            value={this.state.newExcuse}></TextInput>
          <Button
            color="#fa8072"
            title="Save"
            onPress={() => this.saveOwnExcuse()}
            disabled={this.state.submitting}
          />
        </View>

        <View style={styles.button}>
          <Button
            color="#ff1493"
            onPress={() => this.generateExcuse(null)}
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
    paddingBottom: 5,
    alignSelf: "stretch"
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
  whatsappContainer: {
    paddingLeft: 5,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  whatsapp: {
    fontSize: 10,
    fontStyle: "italic",
    alignSelf: "flex-start",
    color: "#25D366"
  },
  whatsappIcon: {
    color: "#25D366",
    paddingRight: 3
  },
  button: {
    marginBottom: 40
  }
});

export default App;
