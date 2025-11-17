import numpy as np
from sklearn.neighbors import KNeighborsClassifier

bill = np.array([75, 90, 50, 60])
usage = np.array([10, 5, 15, 8])
churn = np.array(["No", "No", "Yes", "Yes"])

X = np.column_stack((bill, usage))
y = churn

knn = KNeighborsClassifier(n_neighbors=3, metric='euclidean')
knn.fit(X, y)

new_customer = np.array([[70, 7]])
prediction = knn.predict(new_customer)

print("Churn Prediction:", prediction[0])
