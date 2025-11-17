import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage

X = np.array([
    [15, 39],
    [15, 81],
    [16, 6],
    [16, 77],
    [17, 40],
    [17, 76]
])

link = linkage(X, method='ward')

plt.figure(figsize=(8, 5))
dendrogram(link)
plt.title("Dendrogram")
plt.xlabel("Customers")
plt.ylabel("Euclidean Distance")
plt.show()
