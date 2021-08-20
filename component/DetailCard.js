import React from "react"
import {StyleSheet, View, Text, Image } from "react-native"

const getTypeColor = (type) => {
    if(type == "water"){
        return "#6390F0"
    }else if(type == "fire"){
        return "#EE8130"
    }else if(type == "electric"){
        return "#F7D02C"
    }else if(type == "ice"){
        return "#96D9D6"
    }else if(type == "grass"){
        return "#7AC74C"
    }else if(type == "normal"){
        return "#A8A77A"
    }else if(type == "ghost"){
        return "#735797"
    }else if(type == "fighting"){
        return "#C22E28"
    }else if(type == "flying"){
        return "#A98FF3"
    }else if(type == "rock"){
        return "#B6A136"
    }else if(type == "ground"){
        return "#E2BF65"
    }else if(type == "poison"){
        return "#A33EA1"
    }else if(type == "psychic"){
        return "#F95587"
    }else if(type == "bug"){
        return "#A6B91A"
    }else if(type == "steel"){
        return "#B7B7CE"
    }else if(type == "dark"){
        return "#705746"
    }else if(type == "dragon"){
        return "#6F35FC"
    }
}

const getBarColor = (type) => {
    if(type == "hp"){
        return "#7AC74C"
    }else if(type == "attack"){
        return "#C22E28"
    }else if(type == "defense"){
        return "#E2BF65"
    }else if(type == "special-attack"){
        return "#F95587"
    }else if(type == "special-defense"){
        return "#F7D02C"
    }else if(type == "speed"){
        return "#A98FF3"
    }
}

const rewrite = (text) =>{
    if(text == "hp"){
        return "HP"
    }else if(text == "attack"){
        return "Attack"
    }else if(text == "defense"){
        return "Defense"
    }else if(text == "special-attack"){
        return "Special-Attack"
    }else if(text == "special-defense"){
        return "Special-Defense"
    }else if(text == "speed"){
        return "Speed"
    }
}

const DetailCard = (props) => {
    if(props.children === ''){
        return <View></View>
    }
    return (
        <View style={{...styles.detailContainer, ...props.style}}>
            <View style={styles.topDetailContainer}>
                <Image style={styles.pokemonSprite} source={{uri: props.children.sprites.front_default}}/>
                <View style={styles.nameAndTypesContainer}>
                    <Text style={styles.pokemonName}>{props.children.forms[0].name[0].toUpperCase()+props.children.forms[0].name.slice(1)}</Text>
                    <View style={styles.pokemonTypes}>
                    {
                        props.children.types.map((el, idx)=>{
                            return <Text key={idx} style={{...styles.typeContainer, backgroundColor: getTypeColor(el.type.name)}}>{el.type.name[0].toUpperCase()+el.type.name.slice(1)}</Text>
                        })
                    }
                    </View>
                    <View style={styles.pokemonPhysicStatsContainer}>
                        <Text>HT</Text>
                        <Text style={styles.pokemonPhysicStatsNumber}>{props.children.height}'</Text>
                    </View>
                    <View style={styles.pokemonPhysicStatsContainer}>
                        <Text>WT</Text>
                        <Text style={styles.pokemonPhysicStatsNumber}>{props.children.weight} lbs.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statContainer}>
                <View style={{flexDirection: "column"}}>
                {
                    props.children.stats.map((el)=>{
                        return <Text style={styles.statType}>{rewrite(el.stat.name)}</Text> 
                    })
                }
                </View>
                <View style={styles.statBarsAndValues}>
                {
                    props.children.stats.map((el)=>{
                        return (
                            <View style={styles.statType}>
                                <View style={{...styles.statBar, width: el.base_stat*0.9, backgroundColor: getBarColor(el.stat.name)}}></View>
                                <Text style={styles.statValue}>{el.base_stat}</Text>
                            </View>
                        )
                    })
                }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailContainer: {
        flexDirection: "column"
    },
    topDetailContainer: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 25
    },
    pokemonSprite:{
        width: 140,
        height: 140,
        borderWidth: 2, 
        borderRadius: 20,
        borderColor: "grey",
        margin: 3
    },
    pokemonName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginBottom: 5
    },
    nameAndTypesContainer:{
        marginTop: 20,
        marginLeft: 20
    },
    pokemonTypes: {
        flexDirection: "row",
        marginBottom: 20
    },
    pokemonPhysicStatsContainer: {
        flexDirection: "row"
    },
    pokemonPhysicStatsNumber: {
        marginLeft: 15
    },
    statContainer: {
        flexDirection: "row",
        marginLeft: 60,
        marginTop: 10
    },
    typeContainer: {
        paddingTop: 1,
        paddingBottom: 3,
        paddingLeft: 6,
        paddingRight: 6,
        margin: 1,
        color: "white",
        fontWeight: "bold",
        borderRadius: 3
    },
    statBarsAndValues: {
        flexDirection: "column",
        marginLeft: 20
    },
    statType: {
        flexDirection: "row",
        margin: 3
    },
    statBar: {
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        borderColor: "gray",
        borderWidth: 0.5
    },
    statValue: {
        marginLeft: 3
    }
})

export default DetailCard