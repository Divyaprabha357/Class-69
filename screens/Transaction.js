import React,{Component} from "react";
import {View, Text, StyleSheet} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import  * as Permissions from "expo-permissions"
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            domState:"normal",
            hasCameraPermissions:null,
            scanned:false,
            scannedData:""
        }
    }
    getCameraPermissions= async domState=>{
        const{status }=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted",
            domState:domState,
            scanned:false
        })
    }
    handleBarCodeScanned= async({type,data})=>{
        this.setState({
            scannedData:data,
            domState:"normal",
            scanned:true
        })
    }
    render(){
        const{domState,hasCameraPermissions,scannedData,scanned}=this.state;
        if(domState==="scanner"){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}/>
            )
        }
        return(
            <View style= {styles.container}>
                <Text >
                    {hasCameraPermissions?scannedData:"request for Camera Permissions"}
                </Text>
                <TouchableOpacity 
                style= {styles.button}
                onPress={()=>this.getCameraPermissions("scanner")}>
                <Text style= {styles.buttonText}>SCAN QR CODE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#5653D4"
    },
    text:{
        color:"#ffffff",
        fontSize:50,
    },
    button:{
        width:"43%",
        height:55,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#F48D20",
        borderRadius:50
    },
    buttonText:{
        color:"#ffffff",
        fontSize:24,
    }


})