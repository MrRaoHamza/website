export const blogPosts = [
  {
    slug: "how-i-learned-machine-learning",
    title: "How I Learned Machine Learning: A Roadmap for Undergrads",
    date: "June 15, 2026",
    readTime: "5 min read",
    excerpt: "My journey transitioning from general software engineering to machine learning, covering resources, mathematics, and building portfolios.",
    body: `
### The Journey from Code to Data

When I started my Computer Science degree, coding felt like instructing a machine step-by-step. But with Machine Learning, the paradigm shifts: we give the computer data and let it find the rules. This transition can be challenging but highly rewarding. Here is how I structured my self-taught machine learning roadmap:

#### 1. Foundation of Mathematics (Don't Skip This!)
Before running \`model.fit()\`, understanding the math behind it is essential:
*   **Linear Algebra**: Matrices, vectors, eigenvalues, and dot products (crucial for neural networks).
*   **Calculus**: Derivatives and gradients (essential for backpropagation and optimization).
*   **Probability & Statistics**: Distributions, Bayes theorem, and significance testing (critical for data science).

#### 2. Mastering Python and Scientific Libraries
Python is the lingua franca of AI. I spent months getting comfortable with:
*   **NumPy**: Fast vectorized array calculations.
*   **Pandas**: The ultimate tool for data cleaning and manipulation.
*   **Matplotlib & Seaborn**: Data visualization to understand features before model building.

#### 3. Classical Machine Learning
I started with **Scikit-learn** to learn basic algorithms:
*   *Regression* (Linear, Ridge, Lasso)
*   *Classification* (Logistic Regression, Decision Trees, Random Forests, SVMs)
*   *Clustering* (K-means, Hierarchical)

#### 4. The Deep Learning Shift
Once I mastered classical ML, I progressed to PyTorch and TensorFlow, learning how to build multi-layer perceptrons, convolutional layers for vision, and recurrent networks for temporal data.

*My advice*: Don't just watch videos. Build projects. Take messy public datasets, clean them, train models, and write a summary. That is where real learning happens.
`
  },
  {
    slug: "understanding-cnns",
    title: "Understanding CNNs: Demystifying Computer Vision",
    date: "May 28, 2026",
    readTime: "7 min read",
    excerpt: "An intuitive explanation of how Convolutional Neural Networks process grid-like visual structures to recognize objects.",
    body: `
### How Computers "See"

To a computer, an image is just a massive 2D or 3D grid of numbers representing pixel intensities. Extracting meaning (like identifying a cat or a traffic sign) requires finding spatial features. This is where Convolutional Neural Networks (CNNs) shine.

#### The Core Blocks of a CNN

A standard CNN works through three core operations stacked repeatedly:

##### 1. Convolutional Layer (Feature Extraction)
Instead of connecting every pixel to every neuron (which would blow up the parameter count), a CNN uses small sliding windows called **kernels** or **filters** (e.g., 3x3 grids). 
As the filter slides over the image, it performs element-wise multiplications and sums them up. 
*   Early layers find simple edges and gradients.
*   Deep layers combine these edges to recognize complex structures like eyes, wheels, or ears.

##### 2. Activation Function (Introducing Non-Linearity)
After convolution, we pass the values through an activation function, typically **ReLU (Rectified Linear Unit)**:
$$f(x) = \max(0, x)$$
This replaces all negative values with zero, allowing the network to capture complex, non-linear patterns.

##### 3. Pooling Layer (Dimensionality Reduction)
To make the model robust to shifts in object positions and reduce computational cost, we use **MaxPooling**. For instance, a 2x2 max-pooling window slides over the feature map and keeps only the maximum value, throwing away 75% of the activations while retaining the strongest features.

#### Summary of the Architecture
By stacking \`Conv2D -> ReLU -> MaxPool2D\` blocks, the network reduces the spatial dimensions while increasing the number of filters. At the end, we flatten the features and pass them to standard Dense (Fully Connected) layers to make the final classification.
`
  },
  {
    slug: "pandas-tips-for-clean-data",
    title: "5 Pandas Tips to Streamline Your Data Cleaning Workflow",
    date: "April 10, 2026",
    readTime: "4 min read",
    excerpt: "Avoid slow loops and write cleaner, vectorized Pandas operations for data preprocessing.",
    body: `
### Clean Data, Happy Models

Up to 80% of an AI engineer's time is spent cleaning and preparing data. Standard Python loops over large datasets can be extremely slow. Here are 5 quick Pandas tips to optimize your code:

#### 1. Avoid \`for\` Loops - Use Vectorized Operations
Never iterate over rows with \`for\` loops. Instead of:
\`\`\`python
for idx, row in df.iterrows():
    df.loc[idx, 'new_col'] = row['col_a'] + row['col_b']
\`\`\`
Use vectorized calculations:
\`\`\`python
df['new_col'] = df['col_a'] + df['col_b']
\`\`\`
Vectorized functions run compiled C code under the hood, making them hundreds of times faster.

#### 2. Clean Categories with \`.map()\`
If you have a binary variable with strings, map them directly:
\`\`\`python
gender_map = {'Male': 1, 'Female': 0}
df['gender_numeric'] = df['gender'].map(gender_map)
\`\`\`

#### 3. Use \`.query()\` for Dynamic Filtering
Writing multiple square brackets can get unreadable. Use query string filtering instead:
\`\`\`python
# Instead of df[(df['age'] > 30) & (df['income'] > 50000)]
filtered_df = df.query("age > 30 and income > 50000")
\`\`\`

#### 4. Handle Missing Values Group-wise
Instead of filling all NaNs with a global median, fill them using group averages (e.g., house price missing values grouped by neighborhood):
\`\`\`python
df['price'] = df.groupby('neighborhood')['price'].transform(lambda x: x.fillna(x.median()))
\`\`\`

#### 5. Chain Operations with \`.pipe()\`
If you have multiple cleaning steps, write clean functions and pipe them:
\`\`\`python
def remove_outliers(df):
    return df[df['value'] < 100]

def drop_useless_cols(df):
    return df.drop(columns=['id', 'timestamp'])

clean_df = df.pipe(remove_outliers).pipe(drop_useless_cols)
\`\`\`
This keeps your preprocessing scripts modular and readable!
`
  }
];
