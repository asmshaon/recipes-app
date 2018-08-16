import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Styles from './Styles';

export default class DetailsScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title', ''),
        headerTitleStyle: {
            textAlign: 'left',
            flex: 1
        }
    });

    constructor(props) {
        super(props);

        this.state = {
            recipe: {}
        };
    }

    componentDidMount() {
        this.fetchRecipeDetails(this.props.navigation.getParam('recipeId'));
    }

    fetchRecipeDetails(recipeId) {
        fetch('http://food2fork.com/api/get?rId=' + recipeId + '&key=b3c6da6734a4ddaaf2a7f1c9ee78c933')
            .then(response => response.json())
            .then(response => {
                this.setState({
                    recipe: response.recipe
                });

                this.props.navigation.setParams({ title: this.state.recipe.title });
            });
    }

    render() {
        return (
            <View style={{ flex: 1, paddingBottom: 20 }}>
                <Image
                    style={Styles.detailImage}
                    source={{ uri: this.state.recipe.image_url }}
                />
                <Text
                    style={Styles.detailView}>
                    Name: {this.state.recipe.title}
                </Text>
                <Text
                    style={Styles.detailView}>
                    Social Rank: {this.state.recipe.social_rank}
                </Text>
                <Text
                    style={Styles.detailView}>
                    Ingredients: {this.state.recipe.ingredients}
                </Text>
            </View>
        );
    }

}
