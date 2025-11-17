from sklearn import tree
import pandas as pd

data = {
    "Age": ["<30", "<30", ">=30", ">=30"],
    "EatsPizza": ["Yes", "No", "Yes", "No"],
    "Exercises": ["No", "Morning", "Morning", "No"],
    "Fitness": ["Unfit", "Fit", "Fit", "Unfit"]
}

df = pd.DataFrame(data)

df_encoded = df.replace({
    "<30": 0, ">=30": 1,
    "Yes": 1, "No": 0,
    "Morning": 1
})

X = df_encoded[["Age", "EatsPizza", "Exercises"]]
y = df_encoded["Fitness"]

model = tree.DecisionTreeClassifier()
model.fit(X, y)

tree.plot_tree(model, feature_names=["Age", "EatsPizza", "Exercises"], class_names=["Fit","Unfit"], filled=True)

p1 = model.predict([[0, 1, 0]])     
p2 = model.predict([[1, 0, 1]])      

print("25-year-old outcome:", "Fit" if p1[0]==1 else "Unfit")
print("40-year-old outcome:", "Fit" if p2[0]==1 else "Unfit")
