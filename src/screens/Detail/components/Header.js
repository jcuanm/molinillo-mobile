import React, { Component } from 'react';
import {
	View,
	Dimensions,
	Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CallbacksAndParams from '../../../helpers/CallbacksAndParams';
import DbHandler from '../../../helpers/DbHandler';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.dbHandler = new DbHandler();
        this.updateIsInMyChocolates = this.updateIsInMyChocolates.bind(this); 

		this.state = {
			isInMyChocolates : false,
		};
    }
    
    componentWillMount(){
        this.checkMyChocolates();
    }

    checkMyChocolates(){
		let myChocolatesRef = this.dbHandler.getRef("MyChocolates", null, this.props.uuid);
		let myChocolatesCallbacksAndParams = new CallbacksAndParams(
			{}, 
			this.updateIsInMyChocolates, 
			function(){}
		);
		this.dbHandler.getData(myChocolatesRef, myChocolatesCallbacksAndParams);
    }
    
    updateIsInMyChocolates(){
        this.setState({isInMyChocolates: true})
    }

	render() {
        const { numStarRatings, sumRatings } = this.props;
		return (
			<View style={{
                flexDirection: "row",
                height: 100,
                backgroundColor:"white"
            }}>
                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent:"center",
                    paddingLeft: 25, 
                    fontSize:18
                }}>
                    <Ionicons
                        name="md-heart"
                        size={30}
                        color={this.state.isInMyChocolates ? "red" : "grey"}
                        onPress={() => this.handleInMyChocolates()}
                    />
                </View>

                <View style={{
                    width: Dimensions.get('window').width / 2,
                    justifyContent: 'center',
                }}>	
                    <Text style={{textAlign:"center", fontSize: 30, fontWeight: 'bold'}}> 
                        <Ionicons 
                            name="md-star" 
                            size={30} 
                            color="gold" 
                        />   
                        {(sumRatings / numStarRatings) ? (sumRatings / numStarRatings).toFixed(1) : " "}
                    </Text>

                    <Text style={{fontSize:12, textAlign:"center", color:'rgba(0, 0, 0, .4)'}}>
                        {numStarRatings} <Text style={{fontStyle:"italic", }}>ratings</Text>
                    </Text>
                </View>
            </View>
		);
    }
    
    handleInMyChocolates(){
        const { 
            barcodeType, 
            barcodeData, 
            uuid 
        } = this.props;

        let myChocolatesRef = this.dbHandler.getRef(
            "MyChocolates", 
            null, 
            uuid);

        if(this.state.isInMyChocolates){
            myChocolatesRef
                .delete()
                .then( _ => {
                    alert("Removed from my chocolates");
                    this.setState({isInMyChocolates: false});
                })
        }
        else{
            const data = {
                created_ts: new Date(),
                userId: this.dbHandler.currUser.uid,
                uuid: uuid,
                barcodeData: barcodeData,
                barcodeType: barcodeType
            }
            
            myChocolatesRef
                .set(data)
                .then( _ => {
                    alert("Added to my chocolates");
                    this.setState({isInMyChocolates: true});
                });
        }
    }
}