import numpy as np
from sklearn.cluster import KMeans

data = np.array([
    [15, 39],
    [20, 81],
    [25, 6],
    [70, 75],
    [80, 12]
])

kmeans = KMeans(n_clusters=2, random_state=0)
kmeans.fit(data)

labels = kmeans.labels_
centroids = kmeans.cluster_centers_

print("Cluster Labels:", labels)
print("Centroids:\n", centroids)
