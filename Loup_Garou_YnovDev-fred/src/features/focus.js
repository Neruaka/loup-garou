import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {colors} from '../utils/colors';
import {RoundedButton} from '../components/RoundedButton';
// Importer le nouveau CustomButton
import CustomButton from '../components/CustomButton';
import { spacing } from '../utils/sizes';

export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState("test")
  console.log(subject);
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer} >
        <TextInput  
          style = {styles.textInput}
          label = "test"
          mode = "outlined"
          onChangeText = {setSubject} />
        <View style = {styles.button}>
          <RoundedButton 
            title="+" 
            size={50}  
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
      
      {/* Ajout du nouveau CustomButton en dessous */}
      <View style={styles.customButtonContainer}>
        <CustomButton 
          title="Valider"
          type="primary"
          onPress={() => addSubject(subject)}
        />
        
        {/* Exemple du bouton secondaire également */}
        <CustomButton 
          title="Annuler"
          type="secondary"
          onPress={() => console.log('Annuler')}
          style={styles.secondaryButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: 25,
    justifyContent: 'top',
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  button: {
    justifyContent: 'center',
  },
  customButtonContainer: {
    padding: 25,
    paddingTop: 0,
    gap: 10, // Espace entre les boutons
  },
  secondaryButton: {
    marginTop: 10,
  }
});