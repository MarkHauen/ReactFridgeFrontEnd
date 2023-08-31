import React, { useState, useEffect } from 'react';

const UseItemsForm = ({ inventory, updateInventory }) => {

    const [recipeOptions, setRecipeOptions] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/recipes')
            .then((res) => res.json())
            .then((data) => {
                setRecipeOptions(data.RecipeData.map(recipe => recipe));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleUseItems = () => {
        const selectedRecipeData = recipeOptions.find(recipe => recipe.name === selectedRecipe);
        if (selectedRecipeData) {
            onUseItems(selectedRecipeData.ingredients);
        }
    }

    const onUseItems = async (ingredients) => {
        for (const ingredient of ingredients) {
            const existingItem = inventory.find(item => item.name === ingredient.name);
            if (existingItem) {
                await updateItem(existingItem, ingredient);
            }
        }
    }

    const updateItem = async (existingItem, ingredient) => {
        var newQuantity = parseInt(existingItem.quantity) + parseInt(ingredient.quantity);
        try {
            const res = await fetch(`http://localhost:3000/inventory/${existingItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: existingItem.id,
                    name: existingItem.name,
                    quantity: newQuantity,
                }),
            });
            const data = await res.json();
            // Create a new array that includes all items
            const newInventory = inventory.map(item => {
                // Replace the updated item at its original position
                if (item.id === existingItem.id) {
                    return data;
                } else {
                    return item;
                }
            });
            // Call updateInventory with the new inventory data
            updateInventory(newInventory);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Displays a list of recipes to select from, a list of the ingredients needed and their quantities for the recipe, and a button to use the items in the selected recipe
    return (
        <div>
            <h2>Use Items in Recipes</h2>
            <select onChange={(e) => setSelectedRecipe(e.target.value)}>
                <option value="">Select a Recipe</option>
                {recipeOptions.map((recipe, index) => (
                    <option key={index} value={recipe.name}>
                        {recipe.name}
                    </option>
                ))}
            </select>
            <br />
            <ul className="RecipeIngredientList">
                {recipeOptions.map((recipe, index) => (
                    <div key={index}>
                    {recipe.name === selectedRecipe ? (
                        recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.name}: {ingredient.quantity}
                            </li>
                        ))
                    ) : null}
                    </div>
                ))}
            </ul>
            <button onClick={handleUseItems}>Use Items</button>
        </div>
    );
};


export default UseItemsForm;



