from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Example of setting up a Random Forest with GridSearchCV
model = RandomForestClassifier(random_state=42)
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Hyperparameter tuning
grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=3, n_jobs=-1, verbose=2)
grid_search.fit(X_train, y_train)  # Train on your dataset

# Get the best model
best_model = grid_search.best_estimator_
