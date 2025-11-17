import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

data = pd.read_csv("Assignment-1_Data.csv", sep=None, engine="python")

numeric_data = data.select_dtypes(include=["int64", "float64"])

numeric_data = numeric_data.dropna()

scaler = StandardScaler()
scaled = scaler.fit_transform(numeric_data)

pca = PCA(n_components=2)
pca_result = pca.fit_transform(scaled)

print("Explained Variance Ratio:", pca.explained_variance_ratio_)

pca_df = pd.DataFrame({
    "PCA1": pca_result[:, 0],
    "PCA2": pca_result[:, 1]
})

print(pca_df)
