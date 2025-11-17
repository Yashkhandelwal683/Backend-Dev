import pandas as pd
import numpy as np
from sklearn import svm

data = {
    "X1": [100, 500, 150, 800],
    "X2": [1, 2, 3, 1],
    "Class": [1, -1, 1, -1]
}

df = pd.DataFrame(data)

X = df[["X1", "X2"]]
y = df["Class"]

model = svm.SVC(kernel='linear')
model.fit(X, y)

new_transaction = np.array([[600, 2]])
prediction = model.predict(new_transaction)

print("Predicted Class:", prediction[0])

if prediction[0] == 1:
    print("This transaction is LEGITIMATE (+1).")
else:
    print("This transaction is FRAUDULENT (-1).")