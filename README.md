# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Louis Coulon | 257285 |
| Neelu Kalani | 336452 |
| Shashwat Shrivastava | 336301 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (7th April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

We plan to use datasets taken from the ourworldindata.org website. The data is often directly available in csv format,
therefore easy to parse, and would provide us with all the information we would require. For example, the website has
articles analyzing the greenhouse gas emissions of food products [1], transport [2], or the energy mix of individual
countries [3]. Additionally, all the data is sourced from peer-reviewed conference papers and government reports. Please
see the next section for the rationale behing the utilization of such datasets.

### Problematic

Human emissions of greenhouse gases, such as Carbone Dioxide (CO2), led to the warming of global surface temperatures by
about 1.1°C since pre-industrial levels(1850-1900) [4]. Such an increase in temperature led to important changes in
precipitation distribution and increased climate extremes such as more intense droughts, floods, or wildfires, resulting
in increased pressure on natural ecosystems [4]. The species occupying such ecosystems and the humans relying on them
are already negatively impacted by such a changing climate, with low-income countries at higher risk than high-income
ones. Indeed, as underlined in the IPCC reports [4], around 3.5 billion people live in contexts that are highly
vulnerable to climate change, exposing people to food insecurity and water insecurity. The situation is particularly
concerning since global greenhouse gas emissions have not yet peaked [3].

In this setting, naturally, one is tempted to decrease its emissions and impact on the planet. However, while plenty of
reports and studies analyze independent life choices and habits, it is hard to get a general overview of the impacts of
one's own behavior. Indeed, studies investigated the greenhouse gas emissions per kilograms of food products, different
transport types, energy consumption, or all at once with the IPCC reports, but, the information is either scattered or
included in very long documents. Additionally, while it is helpful to read any such analysis, it is hard without
additional work to have a clear picture of one's own impact. With this project, we plan to provide a visualizer for the
distribution of one's own greenhouse emissions using the data from a set of studies available online. We also plan to
provide, within the same tool, visualizations of average greenhouse gas emissions per country using the same set of
studies. Then, anyone curious about the impact of their lifestyle on the planet could use our tool to assess where
savings could occur and how far one is from others in the same/other countries. In a context where information is often
viewed with a political or economic lens, we believe a data-based visualizer would only be beneficial. With such a tool,
we would be able to answer questions such as: "how far am I from the median of the country?", and give detailed
distribution and visualisation of where the carbon footprint of one lies.

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

Initial analysis of the data gives us insights into the food products that cause the maximum amount of greenhouse gas emissions. Unsurprisingly, beef burger tops the list followed by a cheese dish (macaroni cheese), a meat pizza, and eggs. On the contrary, potatoes, almonds, and almond milk caused minimum emissions.

A kilogram of beef produces 99.48 kilogram of carbon dioxide equivalent, whereas lamb and mutton cause 39.72 kilogram of carbon dioxide emissions. It is interesting to note that per kilogram of chocolate also produce carbon dioxide a bit less than beef but more than lamb and mutton.



### Related work

While some visualization tools already exist online, they are generally confined to a single metric, are overly generic,
or lack the ability to personalize the visualization. We take inspiration from the ourworldindata website, since it
already has some nice visualisation of the dataset we want to investigate. However, they only present averages per
contry, and not a personalized visualisation. Some other websites such as the carbon footprint exist, but they lack the
any visualisation capabilities, either personalized or generalized. Our goal is to provide a global visualization,
including both averages and personalized information, in a single point of reference.

[1] Hannah Ritchie, Pablo Rosado and Max Roser (2022) - "Environmental Impacts of Food Production". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/environmental-impacts-of-food' [Online Resource]
[2] Hannah Ritchie, Max Roser and Pablo Rosado (2022) - "Energy". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/energy' [Online Resource]
[3] Hannah Ritchie, Max Roser and Pablo Rosado (2022) - "Transport". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/transport' [Online Resource]
[4] IPCC, 2022: Climate Change 2022: Impacts, Adaptation, and Vulnerability. Contribution of Working Group II to the
Sixth Assessment Report of the Intergovernmental Panel on Climate Change [H.-O. Pörtner, D.C. Roberts, M. Tignor, E.S.
Poloczanska, K. Mintenbeck, A. Alegría, M. Craig, S. Langsdorf, S. Löschke, V. Möller, A. Okem, B. Rama (eds.)].
Cambridge University Press. Cambridge University Press, Cambridge, UK and New York, NY, USA, 3056 pp.,
doi:10.1017/9781009325844.
[5] Carbon Footprint Website (2022) https://www.carbonfootprint.com/calculator.aspx [Online Resource]


## Milestone 2 (7th May, 5pm)

**10% of the final grade**
### Sketches of the vizualiation

### List the tools

Database management system: File format CSV, loaded using a CSV loader, and parsed using ....

Front-end technologies: We will use HTML, CSS, and JavaScript to create the user interface and design of your website.

Data visualization library: You will need a data visualization library to create the charts and graphs that will display the carbon emissions data. We will use D3.js, Chart.js, and Plotly.js.

Programming language: We will use a programming language to build our web application. We will use Scala JS.

Web hosting: We will be hosting the website on GitHub.


### Pieces to implement
#### Dataset preparation:
* Clean and transform the data as necessary.
* Load the data into the  database management system.
#### User interface design:
* Design the user interface of our website.
* Use HTML, CSS, and JavaScript to create a responsive design.
* Include input fields and buttons to allow users to select the carbon emission of either food or transport. Then for food they select all the food items they consume alongside its consumption; and for transport, they select means of transport and distance travelled. 
#### User input handling:
* Write code to handle user input from the website.
* Retrieve data from the database based on the user input.
* Calculate carbon emissions based on the user input.
#### Data visualization:
* Write code to handle user input from the website.
* Retrieve data from the database based on the user input.
* Calculate carbon emissions based on the user input.
#### Data visualization:
* With the data visualization library create charts and graphs.
* Write code to create visualizations of carbon emissions data.
* Display the visualizations using bar chart for food and travel on the website.
* Display the world map, and then display the carbon emission of the country on which mouse is hovered. A pop up box will display carbon emissions over the year and predicted carbon emissions for the future years.
#### Testing and deployment:
* Test the website and its functionality.
* Deploy the website to a web hosting service GitHub.
* Test the website again after deployment.

### List extra ideas

* Compare individual consumption to average consumption of countries.
* 

### Basic skeleton of the visualization/widgets

## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

