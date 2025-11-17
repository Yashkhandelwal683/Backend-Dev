import pandas as pd
from sklearn.naive_bayes import GaussianNB

data = {
    "Height": [5.8, 5.9, 5.7, 5.2, 5.4, 5.3],
    "Weight": [170, 180, 160, 120, 130, 125],
    "Gender": ["Male", "Male", "Male", "Female", "Female", "Female"]
}

df = pd.DataFrame(data)

X = df[["Height", "Weight"]]
y = df["Gender"]

model = GaussianNB()
model.fit(X, y)

new_point = [[5.5, 145]]
prediction = model.predict(new_point)
print("Predicted Gender:", prediction[0])
