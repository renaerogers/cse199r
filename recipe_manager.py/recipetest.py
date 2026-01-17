recipes = []

ingredients0 = []
ingredients1 = []
ingredients2 = []
ingredients3 = []
ingredients4 = []
ingredients5 = []
ingredients6 = []
ingredients7 = []
ingredients8 = []
ingredients9 = []

action = ""
actions = ["Add", "Delete", "Find", "Cancel"]

print("Welcome to the Recipe Organizer!") 
print()

while action != "CANCEL":
    for thing in actions: 
        print(thing) 
    print() 
    action = (input("What would you like to do? "))
    action = action.upper() 
    print()

    if action == "ADD": 
        added = input("What recipe would you like to add? ")
        added = added.lower()
        print()

        if item in recipes:  
            print("That recipe already exists. ")
            print()
        else: 
            print("New recipe added. ")
            recipes.append(added)
            print() 

            newingredient = ""
            while newingredient != "STOP":
                newingredient = input("What ingredient would you like to add? (Say STOP when no more) ")
                newingredient = newingredient.lower()
                print()

        for i in range(len(recipes)): 
            product = recipes[i]
            human_num = i + 1
            print(f"{human_num}. {product}")
        print()

    elif action == "DELETE": 
        print("Here are your recipes: ")
        for item in recipes: 
            print(item)
        print()

        deletion = input("What recipe would you like to delete? ")
        deletion = deletion.lower()
        print()

        for item in recipes: 
            if item == deletion: 
                recipes.remove(item)
                print("Recipe deleted.")
        
            else: 
                print("Sorry, I can't find that recipe. ")
                recipes.append(added)
        print()
    
    elif action == "FIND": 
        search = input("Would you like to search by RECIPES or INGREDIENTS? ")
        search = search.upper()
        print() 

        if search == "RECIPES":
            print("Here are your recipes: ")
            for thing in recipes: 
                print(thing)
            print()

            find_recipe = input("What recipe are you looking for? ")
            find_recipe = find_recipe.lower()
            print() 

            for item in recipes: 
                if item == find_recipe: 
                    print(f"I found your recipe {item}. ")
                    view = input(f"Would you like to view your {item} recipe? (Y/N)")
                    view = view.upper()

                    if view == "Y": 
                        for i in range(len(recipes)):
                            print()

                    elif view == "N":
                        print("Okay")

    elif action == "CANCEL": 
        print("Thank you for using the Recipe Organizer. Goodbye. ")
        break  

    else: 
        print("Sorry, that was an invalid response. Please try again. ")
        print() 
        action = (input("What would you like to do? "))
        action = action.upper()
        print()