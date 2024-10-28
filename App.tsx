/* eslint-disable */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//package used for validation
import * as Yup from 'yup';
import {Formik} from 'formik';
//it is used for the input validation
const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 character')
    .max(16, 'Should be max of 16 characters')
    .required('Length is required'),
});

const App = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  //it is for generating the password
  const generatePasswrodString = (passwordLength: number) => {
    let characterList = '';
    let upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerCases = 'abcdefghijklmnopqrstuvwxyz';
    let specialChars = '!@#$%^&*()_+';
    let num = '1234567890';
    // if the state is true then it will run
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCases;
    }
    if (numbers) {
      characterList += num;
    }

    if (symbols) {
      characterList += specialChars;
    }
    // it is made for the random numbers
    const passwordResult = createPassword(characterList, passwordLength);
    // After random it set the state
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };
  const createPassword = (character: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * character.length);
      result += character.charAt(characterIndex);
    }
    return result;
  };
  //It is used for reset all the state to default
  const resetPasswordState = () => {
    setPassword('');
    setLowerCase(false);
    setUpperCase(false);
    setSymbols(false);
    setNumbers(false);
    setIsPassGenerated(false)
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text
            style={[
              styles.title,
              isDarkTheme ? {color: 'white'} : {color: 'black'},
            ]}>
            Password Generator
          </Text>
          {/* formik is used for the forms */}
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values, 'asas');
              generatePasswrodString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View>
                    <Text
                      style={[
                        styles.heading,
                        isDarkTheme ? {color: 'white'} : {color: 'black'},
                      ]}>
                      PasswordLength
                    </Text>

                    {touched.passwordLength && errors.passwordLength && (
                      <>
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      </>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex. 8"
                    keyboardType="number-pad"></TextInput>
                </View>
                <View style={styles.inputWrapper}>
                  <View>
                    <Text
                      style={[
                        styles.heading,
                        isDarkTheme ? {color: 'white'} : {color: 'black'},
                      ]}>
                      Include Lowercase
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#ff4d00"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View>
                    <Text
                      style={[
                        styles.heading,
                        isDarkTheme ? {color: 'white'} : {color: 'black'},
                      ]}>
                      Include Uppercase
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View>
                    <Text
                      style={[
                        styles.heading,
                        isDarkTheme ? {color: 'white'} : {color: 'black'},
                      ]}>
                      Include numbers
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#0097ff"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <View>
                    <Text
                      style={[
                        styles.heading,
                        isDarkTheme ? {color: 'white'} : {color: 'black'},
                      ]}>
                      Include symbols
                    </Text>
                  </View>
                  <View>
                    <BouncyCheckbox
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#f700ff"
                    />
                  </View>
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}>
                    <Text style={styles.btnColor}>Generate password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.btnColor}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated && lowerCase ||isPassGenerated &&upperCase ||isPassGenerated &&numbers ||isPassGenerated &&symbols? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.description}>Long Press to copy😉</Text>

            <Text selectable={true} style={styles.genereatedPassword}>
              {password}
            </Text>
          </View>
        ) :  null}
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  formContainer:{
    display:'flex',
    margin:10,
    padding:10,
    elevation:3,
    backgroundColor:'white'
  },
  title: {

    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40,
    
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 18,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  heading: {
    fontSize: 22,
  },
  inputStyle: {
    width: 80,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
  },
  primaryBtn: {
    backgroundColor: 'blue',
    width: '40%',
    padding: 14,
    color: 'white',
    borderRadius: 10,
    justifyContent: 'center',
  },
  secondaryButton: {
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '40%',
    padding: 14,
    borderRadius: 10,
    textAlign: 'center',
  },
  btnColor: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    alignItems: 'center',
  },
  formActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  card: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardElevated: {
    elevation: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  description: {
    color: 'blue',
    fontSize: 22,
    fontWeight: 'bold',
  },
  genereatedPassword: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default App;
