export const projects = [
  {
    id: "student-performance-prediction",
    title: "Student Performance Prediction",
    slug: "student-performance-prediction",
    category: "Machine Learning",
    shortDescription: "An end-to-end ML pipeline that predicts student academic outcomes using Random Forest with SMOTE balancing — deployed live on Render.",
    tech: ["Python", "Pandas", "Scikit-learn", "SMOTE", "Matplotlib", "Seaborn", "Flask"],
    image: "/assets/projects/student_performance.svg",
    githubUrl: "https://github.com/MrRaoHamza/student-performance-predictor",
    demoUrl: "https://student-performance-predictor-j2et.onrender.com/",
    caseStudy: {
      overview: "Student dropout and academic failure are serious problems in education systems worldwide. This project builds a complete, production-deployed Machine Learning pipeline that predicts whether a student will pass or fail based on demographic, social, and academic features. The trained model is served as a live web application on Render, allowing real-time predictions via a user-facing form.",
      problemStatement: "Educational institutions lack automated early-warning systems to flag students at risk before it is too late to intervene. Mid-term grades arrive too late — the goal is to predict outcomes at the start of the term using background information alone, giving counsellors and teachers time to act.",
      dataset: "UCI Machine Learning Repository — Student Performance Dataset (Student-mat.csv). 395 student records from a Portuguese secondary school mathematics class. 33 input features covering demographics (age, sex, address), family background (parental education, family size), lifestyle (study time, free time, going out, alcohol consumption), and academic history (past failures, absences, grades G1 and G2). Target variable: G3 (final grade), binarised as pass (≥10) or fail (<10).",
      approach: "1. Exploratory Data Analysis — distribution plots, correlation heatmap, class balance check (revealed ~33% fail rate). 2. Preprocessing — one-hot encoding for categorical features (school, sex, address, family size, etc.), StandardScaler on numerical columns. 3. Class imbalance — addressed with SMOTE (Synthetic Minority Over-sampling Technique) on the training split only, preventing data leakage. 4. Model selection — evaluated Logistic Regression (74%), Decision Tree (81%), XGBoost (86%), and Random Forest. 5. Hyperparameter tuning — GridSearchCV with 5-fold cross-validation optimised n_estimators, max_depth, min_samples_split, and class_weight. 6. Deployment — serialised the final pipeline (scaler + model) with joblib, wrapped in a Flask API, containerised and deployed on Render.",
      modelArchitecture: "Final model: Random Forest Classifier\n• n_estimators: 200\n• max_depth: 10\n• min_samples_split: 5\n• min_samples_leaf: 2\n• class_weight: balanced\n• random_state: 42\n\nPipeline: StandardScaler → SMOTE (train only) → RandomForestClassifier\nTop 4 features by importance: G2 past grade (0.42), study time (0.27), absences (0.19), parental education (0.12)",
      results: "Random Forest (tuned) achieved:\n• Accuracy: 88.5%\n• Precision: 86.2%\n• Recall: 90.1% (strong sensitivity to at-risk students)\n• F1-Score: 0.88\n• ROC-AUC: 0.92\n\nCompared to baseline Logistic Regression accuracy of 74% — a 14.5 percentage point improvement. The high Recall (90.1%) is the critical metric here: 9 out of 10 students who would fail are correctly identified for early intervention.",
      challenges: "The main challenge was class imbalance — only ~33% of students failed, causing naive models to predict 'pass' for everyone and still achieve 67% accuracy. Applying SMOTE only on the training set (never the test set) resolved this while avoiding data leakage. A secondary challenge was preventing overfitting on the small 395-row dataset — resolved with min_samples_leaf regularisation and cross-validation.",
      futureImprovements: "1. Connect to a real LMS (Moodle/Canvas) via API to pull live attendance and assignment completion data as additional features. 2. Implement SHAP explainability so teachers see exactly which factors drove a specific student's risk score. 3. Extend to multi-class prediction (A/B/C/D/F grade bands) rather than binary pass/fail. 4. Add a teacher dashboard with batch CSV upload for whole-class predictions."
    }
  },
  {
    id: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    slug: "customer-churn-prediction",
    category: "Machine Learning",
    shortDescription: "Predictive model built to analyze customer behavior patterns and identify users at risk of churning in a subscription-based business.",
    tech: ["Python", "Pandas", "XGBoost", "Scikit-learn", "Plotly"],
    image: "/assets/projects/customer_churn.png",
    githubUrl: "https://github.com/raohamza/customer-churn-prediction",
    demoUrl: "https://customer-churn-dashboard.vercel.app",
    caseStudy: {
      overview: "Customer acquisition costs are substantially higher than retention costs. By predicting churn early, marketing teams can implement targeted retention strategies (discounts, outreach) to preserve subscription revenue.",
      problemStatement: "A telecom subscription provider experienced an annual churn rate of 15%, resulting in millions in lost ARR. They needed an early-warning system capable of scoring active subscribers based on their probability to cancel service.",
      dataset: "Telco Churn Dataset containing 7,043 rows and 21 features (demographics, services signed up for, billing info, and account details).",
      approach: "Explored customer tenure, contract types, and payment methods. Replaced missing values in TotalCharges, scaled continuous features using RobustScaler, and encoded multi-categorical inputs. Employed XGBoost with early stopping to prevent overfitting.",
      modelArchitecture: "XGBoost Classifier combined with SHAP (SHapley Additive exPlanations) values to explain individual predictions and provide transparency to marketing representatives.",
      results: "Achieved an ROC-AUC of 0.89 and a F1-Score of 0.81. The model correctly identified 84% of churning customers prior to their contract renewal windows.",
      challenges: "Feature interactions were highly non-linear (e.g., fiber optic users with month-to-month contracts had extremely high churn rates). Standard linear models failed to capture this, which motivated the transition to gradient boosted trees.",
      futureImprovements: "Implement survival analysis to predict not just *if* a customer will churn, but *when*, allowing for optimized timeline-based marketing campaigns."
    }
  },
  {
    id: "house-price-prediction",
    title: "House Price Prediction",
    slug: "house-price-prediction",
    category: "Data Science",
    shortDescription: "An advanced regression analysis model predicting residential property values based on structural, location, and economic features.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Seaborn"],
    image: "/assets/projects/house_price.png",
    githubUrl: "https://github.com/raohamza/house-price-prediction",
    demoUrl: "https://house-prices-dashboard.vercel.app",
    caseStudy: {
      overview: "Predicting real estate prices requires synthesizing diverse factors, including spatial data, physical characteristics, and macroeconomic indicators. This project applies high-dimensional regression algorithms to predict housing prices.",
      problemStatement: "Traditional property valuations are highly subjective and slow. Buyers and sellers need accurate, automated, and instant valuations to make informed financial transactions.",
      dataset: "Ames Housing Dataset consisting of 2,930 observations with 80 explanatory variables describing residential properties in Ames, Iowa.",
      approach: "Performed log-transformation on skewed target variables (SalePrice). Imputed missing values with median values based on neighborhood groupings. Handled categorical features through target encoding. Reduced multi-collinearity using Principal Component Analysis (PCA). Trained Lasso and Ridge regression models.",
      modelArchitecture: "Ensemble model blending Ridge Regression, Lasso, and LightGBM using a Stacking Regressor meta-model.",
      results: "Achieved a Root Mean Squared Error (RMSE) of 0.114 on log-transformed prices, translating to a mean absolute percentage error (MAPE) of under 7.5% on actual prices.",
      challenges: "Handling extreme outliers and high cardinality categorical features (like Neighborhoods) without causing overfitting. Target encoding with smoothing parameter helped stabilize model behavior.",
      futureImprovements: "Scraping local neighborhood amenities, crime rates, and school ratings to append external spatial indicators to the Ames dataset."
    }
  },
  {
    id: "image-classification-cnn",
    title: "Image Classification using CNN",
    slug: "image-classification-cnn",
    category: "Deep Learning",
    shortDescription: "Convolutional Neural Network (CNN) built to classify images across multiple categories with custom training and transfer learning variants.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Matplotlib"],
    image: "/assets/projects/image_classification.png",
    githubUrl: "https://github.com/raohamza/image-classification-cnn",
    demoUrl: "https://cnn-classifier-demo.vercel.app",
    caseStudy: {
      overview: "Computer vision plays a key role in automated sorting, medical diagnostics, and autonomous vehicles. This project explores building custom CNNs and comparing their performance with state-of-the-art transfer learning architectures.",
      problemStatement: "Accurately identifying and categorizing visual assets at scale. The custom network must balance high classification accuracy with low parameter counts for edge-device deployability.",
      dataset: "CIFAR-10 dataset containing 60,000 32x32 color images in 10 classes, with 6,000 images per class.",
      approach: "Applied extensive data augmentation (random rotations, horizontal flips, zooming, color shifts) to prevent overfitting. Implemented a custom CNN architecture with stacked Convolutional, BatchNormalization, and Max-Pooling layers. Compared custom network against a pre-trained MobileNetV2.",
      modelArchitecture: "Custom CNN with 3 Convolutional blocks (32, 64, 128 filters respectively, kernel size 3x3, ReLU activation), followed by Global Average Pooling, a Dense layer of 256 units with Dropout (0.5), and a Softmax output layer.",
      results: "The custom CNN achieved 82.4% test accuracy. The transfer learning MobileNetV2 model achieved 91.8% test accuracy, showing the effectiveness of pre-trained spatial features.",
      challenges: "Overfitting occurred rapidly on the small CIFAR images when scaling model capacity. Mitigated this by replacing standard Flatten layers with Global Average Pooling and introducing heavy spatial dropouts.",
      futureImprovements: "Convert the model to TensorFlow Lite (TFLite) format for deployment on mobile and IoT devices, and run inference benchmarks."
    }
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis of Reviews",
    slug: "sentiment-analysis",
    category: "Deep Learning",
    shortDescription: "A natural language processing pipeline to extract, tokenize, and classify text reviews into positive, negative, or neutral sentiments.",
    tech: ["Python", "PyTorch", "Hugging Face", "Transformers", "NLP"],
    image: "/assets/projects/sentiment_analysis.png",
    githubUrl: "https://github.com/raohamza/sentiment-analysis",
    demoUrl: "https://nlp-sentiment-analyzer.vercel.app",
    caseStudy: {
      overview: "Analyzing public sentiment on products and services is critical for brand monitoring. This project implements a BERT-based transformer model to automate review classification with high semantic understanding.",
      problemStatement: "Traditional bag-of-words or TF-IDF models fail to capture context, sarcasm, and negation (e.g., 'not bad at all' is flagged negative due to 'not' and 'bad'). A deeper, transformer-based language model is needed.",
      dataset: "IMDb Movie Reviews dataset containing 50,000 highly polar movie reviews for binary sentiment classification.",
      approach: "Cleaned HTML tags and special characters from text. Utilized Hugging Face's BERT tokenizer. Fine-tuned the `bert-base-uncased` model using PyTorch and the AdamW optimizer with a linear learning rate scheduler.",
      modelArchitecture: "Transformer-based Model. Consists of a pre-trained BERT encoder layer followed by a custom classification head (Dropout, Linear layer, Softmax) mapping token embeddings to class labels.",
      results: "Achieved a classification accuracy of 93.6% and a Macro F1-score of 0.93. The model successfully understood complex contextual negations.",
      challenges: "Fine-tuning BERT on standard CPU environments was computationally infeasible. Resolved by leveraging Google Colab GPUs, optimizing batch sizes, and using mixed-precision training (FP16) to conserve GPU memory.",
      futureImprovements: "Aspect-based sentiment analysis (ABSA), identifying sentiments about specific features of a product (e.g., battery life vs camera quality) rather than just the overall product."
    }
  },
  {
    id: "recommendation-system",
    title: "Recommendation System",
    slug: "recommendation-system",
    category: "Data Science",
    shortDescription: "A collaborative filtering and content-based recommendation engine suggesting movies or items based on historical user interactions.",
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Surprise"],
    image: "/assets/projects/recommendation_system.png",
    githubUrl: "https://github.com/raohamza/recommendation-system",
    demoUrl: "https://recommender-engine-demo.vercel.app",
    caseStudy: {
      overview: "Recommendation engines drive engagement in e-commerce, entertainment, and content platforms. This project designs a hybrid recommendation engine that combines collaborative filtering and content-based similarity.",
      problemStatement: "The 'cold start' problem: recommending items to new users with zero history, and suggesting new items that have not yet been rated by any user.",
      dataset: "MovieLens 100K Dataset. Contains 100,000 ratings (1-5) from 943 users on 1,682 movies.",
      approach: "Constructed User-Item interaction matrix. Used Singular Value Decomposition (SVD) for matrix factorization to capture latent factors of user preferences. Created TF-IDF matrix of movie genres and plots to provide content-based fallback matching.",
      modelArchitecture: "Hybrid Recommendation System blending Collaborative Filtering (using SVD) with Content-Based filtering (using Cosine Similarity on TF-IDF metadata).",
      results: "Decreased Root Mean Squared Error (RMSE) of rating predictions to 0.89 on test data, while maintaining content relevance for cold-start cases.",
      challenges: "Matrix sparsity (over 93% of the interaction matrix was empty). Resolved this by utilizing matrix factorization techniques that infer missing values from latent dimensions rather than direct computation.",
      futureImprovements: "Integrating deep-learning-based recommendations, such as Neural Collaborative Filtering (NCF) or Session-based recommendation networks (GRU4Rec)."
    }
  }
];
