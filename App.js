import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class App extends Component
{
	constructor()
	{
		super()
		this.state = {
			resultText: "",
			calculationText: ""
		}
		this.operations = ["CE", "DEL", "+", "-", "*", "/"]
	}

	calculateResult()
	{
		const text = this.state.resultText;
		this.setState({
			calculationText: eval(text)
		})
	}

	validate()
	{
		const text = this.state.resultText
		switch (text.slice(-1))
		{
			case "+":
			case "-":
			case "*":
			case "/":
			return false;
		}
		return true
	}

	buttonPressed(text)
	{
		if (text == "=")
		{
			return this.validate() && this.calculateResult();
		}

		this.setState({
			resultText: this.state.resultText+text
		})
	}

	clearEverything()
	{
		this.setState({
			resultText: "",
			calculationText: ""
		})
	}

	operate(operation)
	{
		switch(operation)
		{
			case "DEL":
				let text = this.state.resultText.split("");
				text.pop();
				text.join("");
				this.setState({
					resultText: text.join("")
				})
				break;

			case "CE":
				this.clearEverything();
				break;

			case "+":
			case "-":
			case "*":
			case "/":
				const lastCharacter = this.state.resultText.split("").pop();
				if (this.operations.indexOf(lastCharacter) > 0) return
				if(this.state.text == "=") return
				this.setState({
					resultText: this.state.resultText + operation
				})
				break;
		}
	}

	render()
	{

		let rows = [];
		let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, "="]]
		for (let i=0; i<4; i++)
		{
			let row = [];
			for (let x=0; x < 3; x++)
			{
				row.push(
					<TouchableOpacity onPress={()=> this.buttonPressed(nums[i][x])} style={styles.button}>
						<Text style={styles.buttonText}>
							{nums[i][x]}
						</Text>
					</TouchableOpacity>
				);
			}
			rows.push(
				<View style={styles.row}>{row}</View>
			)
		}

		let ops = [];
		for (let i=0; i < 6; i++)
		{
			ops.push(
				<TouchableOpacity style={styles.button} onPress={()=> this.operate(this.operations[i])}>
					<Text style={styles.buttonText}>
						{this.operations[i]}
					</Text>
				</TouchableOpacity>
			)
		}

		return (
			<View style={styles.container}>
				<View style={styles.result}>
					<Text style={styles.resultText}>{this.state.resultText}</Text>
				</View>
				<View style={styles.calculation}>
					<Text style={styles.calculationText}>{this.state.calculationText}</Text>
				</View>

				<View style={styles.buttons}>
						<View style={styles.numbers}>
							{rows}
						</View>
					<View style={styles.operations}>
						{ops}
					</View>
				</View>

			</View>
		);
	}
}


// stylesheet
const styles = StyleSheet.create({
	container:
	{
		flex: 1,
	},
	row:
	{
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	},
	button:
	{
		flex: 1,
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "center"
	},
	buttonText:
	{
		fontSize: 25,
		color: "white"
	},
	result:
	{
		flex: 2,
		color: "black",
		backgroundColor: "#FCF6B1",
		justifyContent: "center",
		alignItems: "flex-end"
	},
	calculation:
	{
		flex: 1,
		backgroundColor: "#A9E5BB",
		justifyContent: "center",
		alignItems: "flex-end"
	},
	buttons:
	{
		flex: 7,
		flexDirection: "row"
	},
	numbers:
	{
		flex: 3,
		color: "#FFFFFF",
		backgroundColor: "#2D1E2F"
	},
	operations:
	{
		flex: 1,
		backgroundColor: "#F72C25",
		justifyContent: "space-around",
	},
	resultText:
	{
		fontWeight: "600",
		fontSize: 35,
		color: "#2D1E2F"
	},
	calculationText:
	{
		fontWeight: "600",
		color: "#2D1E2F",
		fontSize: 30
	}
});
