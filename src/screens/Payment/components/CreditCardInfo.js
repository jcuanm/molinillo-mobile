import React from 'react';
import { 
    Picker, 
    Platform,
    TextInput, 
    Text,
    View 
} from 'react-native';
import { CreditCardInfoStyles } from '../styles';


export default class CreditCardInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useShippingAddress: false
        }
    }

    render(){
        const { 
            updatePaymentInfo, 
            nameOnCard,
            creditCardNumber,
            cvc,
            expirationMonth,
            expirationYear
        } = this.props;

        const pickerStyle = Platform.OS == "ios" ? CreditCardInfoStyles.iosPicker : CreditCardInfoStyles.picker;

        return(
            <View>
                <Text style={CreditCardInfoStyles.title}>Card information</Text>
                <TextInput 
                    value={nameOnCard}
                    maxLength={255}
                    blurOnSubmit
                    placeholder={"Name on card"}
                    clearButtonMode={"always"}
                    style={CreditCardInfoStyles.inputBox} 
                    onChangeText={newText => updatePaymentInfo("nameOnCard", newText)}
                />
                <TextInput 
                    value={creditCardNumber}
                    maxLength={19}
                    clearButtonMode={"always"}
                    blurOnSubmit
                    placeholder={"Card number"}
                    style={CreditCardInfoStyles.inputBox} 
                    onChangeText={newText => updatePaymentInfo("creditCardNumber", newText)}
                />
                <TextInput 
                    value={cvc}
                    maxLength={4}
                    blurOnSubmit
                    clearButtonMode={"always"}
                    placeholder={"CVC"}
                    style={CreditCardInfoStyles.cvcBox} 
                    onChangeText={newText => updatePaymentInfo("cvc", newText)}
                />

                <Text style={CreditCardInfoStyles.title}>Expiration date</Text>

                <View style={CreditCardInfoStyles.pickersContainer}>
                    <Picker 
                        selectedValue={expirationMonth}
                        onValueChange={(itemValue, itemIndex) => updatePaymentInfo("expirationMonth", itemValue)}
                        style={pickerStyle}
                        mode={"dropdown"}
                    >
                        <Picker.Item label={"01"} value={"01"} />
                        <Picker.Item label={"02"} value={"02"} />
                        <Picker.Item label={"03"} value={"03"} />
                        <Picker.Item label={"04"} value={"04"} />
                        <Picker.Item label={"05"} value={"05"} />
                        <Picker.Item label={"06"} value={"06"} />
                        <Picker.Item label={"07"} value={"07"} />
                        <Picker.Item label={"08"} value={"08"} />
                        <Picker.Item label={"09"} value={"09"} />
                        <Picker.Item label={"10"} value={"10"} />
                        <Picker.Item label={"11"} value={"11"} />
                        <Picker.Item label={"12"} value={"12"} />
                    </Picker>

                    <Picker 
                        selectedValue={expirationYear}
                        onValueChange={(itemValue, itemIndex) => updatePaymentInfo("expirationYear", itemValue)}
                        style={pickerStyle}
                        mode={"dropdown"}
                    >
                        {this.getExpirationYearItems()}
                    </Picker>
                </View>
            </View>
        );
    }

    getExpirationYearItems(){
        let maxNumYears = 20;
        let pickerItems = [];
        for(var i = 0; i < maxNumYears + 1; i++){
            pickerItems.push(
                <Picker.Item 
                    key={i} 
                    label={(new Date().getFullYear() + i).toString()} 
                    value={(new Date().getFullYear() + i).toString()} 
                />
            );
        }
        return pickerItems;
    }
}
