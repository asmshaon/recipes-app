import React, { Component } from 'react';
import { View, Text, ListView, Image, Button } from 'react-native';
import Styles from './Styles';

export default class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Recipes Listing App',
        headerTitleStyle: {
            textAlign: 'center',
            flex: 1
        }
    });

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            searchText: 'pizza',
            recipes: dataSource
        }
    }

    componentDidMount() {
        this.fetchRecipes();
    }

    fetchRecipes() {
        fetch('http://food2fork.com/api/search?q=pizza&key=b3c6da6734a4ddaaf2a7f1c9ee78c933')
            .then(response => response.json())
            .then(response => {                
                this.setState({
                    recipes: this.state.recipes.cloneWithRows(response.recipes)
                });
            });
    }

    renderRow(recipe) {
        return (
            <View style={Styles.listItems}>
                <Image
                    style={{ width: 350, height: 250 }}
                    source={{ uri: recipe.image_url }}
                />
                <Button
                    title={recipe.title}
                    onPress={() => {
                        this.props.navigation.navigate('Details', { recipeId: recipe.recipe_id })
                    }}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={Styles.homeContainter}>                
                <ListView
                    dataSource={this.state.recipes}
                    renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }

}