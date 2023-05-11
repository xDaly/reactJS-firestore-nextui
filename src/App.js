import "./App.css";
import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@nextui-org/react";

import { Input, Text, Loading } from "@nextui-org/react";

import { SunIcon } from "./SunIcon";
import { SendButton } from "./SendButton";
import { SendIcon } from "./SendIcon";
import { useState } from "react";

export default function App() {
  const [cin, setCin] = useState("");
  const [loading, setLoading] = useState(false);

  const [Nom, setNom] = useState("");
  const [Email, setEmail] = useState("");
  const [Age, setAge] = useState("");
  const [NumCIN, setNumCIN] = useState("");
  const [Poids, setPoids] = useState("");
  const [Taille, setTaille] = useState("");
  const [Allergy, setAllergy] = useState("");
  const [GroupeSanguin, setGroupeSanguin] = useState("");
  const [Disease, setDisease] = useState("");
  const [Médicament, setMédicament] = useState("");
  const [Dosage, setDosage] = useState("");
  const [Vaccin, setVaccin] = useState("");
  const [Mauvaishabitude, setMauvaishabitude] = useState("");
  const firebaseConfig = {
    apiKey: "AIzaSyCV-UUcghxGshD8XdRth69z3P-JAIN2XCE",
    authDomain: "medical-record-9c35b.firebaseapp.com",
    projectId: "medical-record-9c35b",
    storageBucket: "medical-record-9c35b.appspot.com",
    messagingSenderId: "310562327920",
    appId: "1:310562327920:web:e3ab425053d5ea65ffd3b5",
    measurementId: "G-GZ7ZES3LNW",
  };

  const fire_app = initializeApp(firebaseConfig);
  const firestore = getFirestore(fire_app);
  const diseaseRef = collection(firestore, "disease");
  const usersRef = collection(firestore, "users");
  const allergy = collection(firestore, "allergy");
  const BadHabit = collection(firestore, "badHabit");
  const bloodType = collection(firestore, "bloodType");
  const medicament = collection(firestore, "medicament");
  const vaccinRef = collection(firestore, "vaccin");

  const get = async () => {
    try {
      setNom("");
      setEmail("");
      setAge("");
      setNumCIN("");
      setPoids("");
      setTaille("");
      setAllergy("");
      setGroupeSanguin("");
      setDisease("");
      setMédicament("");
      setDosage("");
      setVaccin("");
      setMauvaishabitude("");
      setLoading(true);
      let disease = {};
      const q = query(usersRef, where("Num Cin", "==", +cin));
      const querySnapshot = await getDocs(q);
      const user = querySnapshot.docs[0].data();
      const docId = querySnapshot.docs[0].id;

      const q1 = query(diseaseRef, where("uid", "==", docId));
      const querySnapshot1 = await getDocs(q1);

      const q2 = query(allergy, where("uid", "==", docId));
      const querySnapshot2 = await getDocs(q2);

      const q3 = query(BadHabit, where("uid", "==", docId));
      const querySnapshot3 = await getDocs(q3);

      const q4 = query(bloodType, where("uid", "==", docId));
      const querySnapshot4 = await getDocs(q4);

      const q5 = query(medicament, where("uid", "==", docId));
      const querySnapshot5 = await getDocs(q5);
 
      const q6 = query(vaccinRef, where("uid", "==", docId));
      const querySnapshot6 = await getDocs(q6);

      setNom(user.Nom);
      setEmail(user.Email);
      setAge(user.Age);
      setNumCIN(user["Num Cin"]);
      setPoids(user.Poids);
      setTaille(user.Taille);

      if (querySnapshot1.docs.length > 0) {
        disease = querySnapshot1.docs[0].data();
        setDisease(disease.Nom + " " + disease.Description);
      }
      if (querySnapshot2.docs.length > 0) {
        const allergy = querySnapshot2.docs[0].data();
        setAllergy(allergy.nom + " " + allergy.description);
      }

      if (querySnapshot3.docs.length > 0) {
        const BadHabit = querySnapshot3.docs[0].data();
        setMauvaishabitude(BadHabit['Mauvais Habitude']);
      }

      if (querySnapshot4.docs.length > 0) {
        const bloodType = querySnapshot4.docs[0].data();
        setGroupeSanguin(bloodType['Groupe sanguin']);
      }

      if (querySnapshot5.docs.length > 0) {
        const medicament = querySnapshot5.docs[0].data();
        setMédicament(medicament.Médicament);
        setDosage(medicament.Dosage);
      }
     
      if (querySnapshot6.docs.length > 0) {
        const vaccin = querySnapshot6.docs[0].data();
        setVaccin(vaccin.nom + " " + vaccin.description);
      }

      // const users = await getDocs(usersRef);
      // users.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Erreur de communication avec la base de données");
    }
  };

  return (
    <>
      <div className="container">
        <Input
          clearable
          bordered
          color="primary"
          onChange={(e) => setCin(e.target.value)}
          labelPlaceholder="Write User CIN Number..."
          style={{ margin: 80 }}
          // contentRight={<SendIcon get={get} size="xs" />}
        />
        <div style={{ margin: 40 }}>
          <Button
            disabled={cin.length < 5 || loading}
            color="gradient"
            auto
            ghost
            onPress={get}
          >
            {loading ? <Loading color="currentColor" size="sm" /> : "Search"}
            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          </Button>
        </div>
        <div className="card">
          {Nom ? <Text size="$xl">Nom: {Nom}</Text> : null}
          {Email ? <Text size="$xl">Email: {Email}</Text> : null}
          {Age ? <Text size="$xl">Age: {Age}</Text> : null}
          {NumCIN ? <Text size="$xl">Num CIN: {NumCIN}</Text> : null}
          {Poids ? <Text size="$xl">Poids: {Poids}</Text> : null}
          {Taille ? <Text size="$xl">Taille: {Taille}</Text> : null}
          {Allergy ? <Text size="$xl">Allergy: {Allergy}</Text> : null}
          {GroupeSanguin ? (
            <Text size="$xl">Groupe Sanguin: {GroupeSanguin}</Text>
          ) : null}
          {Disease ? <Text size="$xl">Disease: {Disease}</Text> : null}
          {Médicament ? <Text size="$xl">Médicament: {Médicament}</Text> : null}
          {Dosage ? <Text size="$xl">Dosage: {Dosage}</Text> : null}
          {Vaccin ? <Text size="$xl">Vaccin: {Vaccin}</Text> : null}
          {Mauvaishabitude ? (
            <Text size="$xl">Mauvais habitude: {Mauvaishabitude}</Text>
          ) : null}
        </div>
      </div>
    </>
  );
}

// export default function App() {
//   return (
//     <>
//       <Grid.Container gap={4}>
//         <Grid>
//           <Input
//             clearable
//             contentRightStyling={false}
//             placeholder="Type your message..."
//             contentRight={
//               <SendButton>
//                 <SendIcon />
//               </SendButton>
//             }
//           />
//         </Grid>
//         <Grid>
//           <Input
//             clearable
//             underlined
//             color="warning"
//             labelPlaceholder="Sun icon"
//             contentRight={
//               <SunIcon filled width="16" height="16" fill="#f5a623" />
//             }
//           />
//         </Grid>
//         <Grid>
//           <Input
//             clearable
//             bordered
//             color="primary"
//             labelPlaceholder="Loading..."
//             contentRight={<Loading size="xs" />}
//           />
//         </Grid>
//       </Grid.Container>
//     </>
//   );
// }
