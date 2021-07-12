# Data-Journalism
Analysis of health risks facing particular demographics using D3

## Scatter Plot
The app.js contains code for a scatter plot that represents each state with circle elements. The scatter plot values are pulled in the data from data.csv by using the d3.csv function. 


The scatter plot contains the below functionality

* State abbreviations in the circles.
* Dynamic Y axis that allows users to select either the Lacks healthcare, smokes, or obese label.
* Dynamic X axis that allows users to select either the In Poverty, Age, or Household Income label.

![Animated Scatter](./Images/7-animated-scatter.gif)

* Tooltips for each state circle that shows the data for the selected axes labels.

![Tooltip](./Images/8-tooltip.gif)
