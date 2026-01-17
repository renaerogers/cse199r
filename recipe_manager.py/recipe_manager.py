recipes = [""]

newrecipe = input("What recipe would you like to add? ")
recipes.append(newrecipe)

print(recipes)

ingredients = [""]
newingredient = ""

while newingredient != "STOP":
    newingredient = input("What are the ingredients (1 at a time, say STOP when no more)? ")
    if newingredient == "STOP":
        print("Thank you.")
    else:
        ingredients.append(newingredient)