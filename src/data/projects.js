export const projects = [
  {
    id: "student-performance-prediction",
    title: "Student Performance Prediction",
    slug: "student-performance-prediction",
    category: "Machine Learning",
    shortDescription: "A machine learning pipeline to predict student academic outcomes and identify at-risk students using predictive modeling.",
    tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    image: "/assets/projects/student_performance.png",
    githubUrl: "https://github.com/raohamza/student-performance-prediction",
    demoUrl: "https://student-performance-predict.vercel.app",
    caseStudy: {
      overview: "Academic success is crucial, and early detection of students at risk of underperforming allows for timely intervention. This project builds an end-to-end Machine Learning pipeline to analyze historical academic data, demographic factors, and behavioral patterns to predict final outcomes.",
      problemStatement: "Educational institutions often lack automated systems to proactively identify students who are likely to fail or require academic support. Traditional methods rely on mid-term grades, which are often too late for effective remedial intervention.",
      dataset: "UCI Machine Learning Repository - Student Performance Dataset. Consists of 649 instances (Portuguese class) and 395 instances (Math class) with 33 features covering demographic, social, and school-related attributes.",
      approach: "Used exploratory data analysis (EDA) to understand feature distributions. Applied one-hot encoding to categorical features, normalized numerical columns, and addressed class imbalance using SMOTE. Engineered new features like 'study-to-free-time ratio' and 'parental support score'. Evaluated multiple models including Random Forest, Gradient Boosting, and XGBoost.",
      modelArchitecture: "Supervised Classification model utilizing a Random Forest Classifier with Hyperparameter Tuning via GridSearchCV. Important hyperparameters optimized: max_depth=10, n_estimators=200, and min_samples_split=5.",
      results: "The optimized Random Forest model achieved an Accuracy of 88.5%, Precision of 86.2%, and Recall (Sensitivity to identifying at-risk students) of 90.1%, significantly outperforming the baseline logistic regression model.",
      challenges: "Dealing with class imbalance (far fewer students failing than passing) was a major hurdle. Standard training resulted in high overall accuracy but poor recall for failing grades. Applying SMOTE combined with class-weight adjustment resolved this.",
      futureImprovements: "Integrating real-time engagement data from Learning Management Systems (LMS) and implementing recurrent architectures (LSTM) to capture temporal trends in student engagement throughout the semester."
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
