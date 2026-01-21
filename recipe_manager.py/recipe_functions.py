def find_ingredient(recipes, ingredient):
    found_recipes = []
    for recipe in recipes:
        if ingredient in recipe['ingredients']:
            found_recipes.append(recipe['name'])
    return found_recipes