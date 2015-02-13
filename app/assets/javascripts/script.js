var currentPlayer;
var board;
var MAX_ROWS = 6;
var MAX_COLS = 7;
var MAX_TURNS = 42;

var BOOLEAN = 0;
var INTEGER = 1;

var turnCount;

//START PVP

function rowInit()
{
	console.log("New row.");
	this.cols = [0, 0, 0, 0, 0, 0, 0];
};

function boardInit()
{
	console.log("New board.");
	this.rows = [new rowInit(), new rowInit(), new rowInit(), new rowInit(), new rowInit(), new rowInit()];
};

function init()
{
	currentPlayer = 1;
	board = new boardInit();
	turnCount = 1;
	console.log("Initialized.");
};

function printBoard()
{
	var stringBuild = "Current board layout:\n";
	for(var i = 0; i < MAX_ROWS; i++)
	{
		for(var j = 0; j < MAX_COLS; j++)
		{
			stringBuild += board.rows[i].cols[j] + " ";
		}
		stringBuild += "\n";
	}
	console.log(stringBuild);
};

function switchPlayer()
{
	if(currentPlayer == 1)
	{
		currentPlayer = 2;
		document.getElementById('buttonRow1').id = 'buttonRow2';
	}
	else
	{
		currentPlayer = 1;
		document.getElementById('buttonRow2').id = 'buttonRow1';
	}
}

function oppositePlayer()
{
	if(currentPlayer == 1)
		return 2;
	else
		return 1;
}

function getCell(row, col)
{
	return board.rows[row].cols[col];
};

function setCell(row, col, value)
{
	board.rows[row].cols[col] = value;
}

function getRowOfEmptyCell(col)
{
	var flag = true;
	var ret = -1;

	for(var i = MAX_ROWS - 1; i >= 0; i--)
	{
		if(getCell(i, col) == 0)
		{
			ret = i;
			flag = false;
		}
		if(!flag)
			break;
	}
		
	return ret;
};

function checkHorizontal(row, col, returnType, player)
{
	var i;
	var count = 0;

	//left
	for(i = col; i >= 0; i--)
	{
		if(getCell(row, i) == player)
		{
			count++;
		}
		else
			break;
		
		if(count >= 4)
			if(returnType == BOOLEAN)
				return true;
			else
				return count;
	}

	//right
	for(i = col + 1; i < MAX_COLS; i++)
	{
		if(getCell(row, i) == player)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			if(returnType == BOOLEAN)
				return true;
			else
				return count;
	}

	// console.log("checkHorizontal():" + count);

	if(returnType == BOOLEAN)
		return false;
	else
		return count;
};

function checkVertical(row, col, returnType, player)
{
	var i;
	var count = 0;

	//down
	for(i = row; i < MAX_ROWS; i++)
	{
		if(getCell(i, col) == player)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			if(returnType == BOOLEAN)
				return true;
			else
				return count;
	}

	// console.log("checkVertical():" + count);

	if(returnType == BOOLEAN)
		return false;
	else
		return count;
};

function checkDiagonalTLBR(row, col, returnType, player)
{
	var i;
	var count = 0;

	//down-right row++ col++

	i = 0;

	while(row + i < MAX_ROWS && col + i < MAX_COLS)
	{
		if(getCell(row + i, col + i) == player)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			if(returnType == BOOLEAN)
				return true;
			else
				return count;

		i++;
	}

	//up-left row-- col--

	i = 1;

	while(row - i >= 0 && col - i >= 0)
	{
		if(getCell(row - i, col - i) == player)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			if(returnType == BOOLEAN)
				return true;
			else
				return count;

		i++;
	}

	// console.log("checkDiagonalTLBR():" + count);

	if(returnType == BOOLEAN)
		return false;
	else
		return count;
};

function checkDiagonalTRBL(row, col, returnType, player)
{
	var i;
	var count = 0;

	//down-left row++ col--

	i = 0;

	while(row + i < MAX_ROWS && col - i >= 0)
	{
		if(getCell(row + i, col - i) == player)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			if(returnType == BOOLEAN)
				return true;
			else
				return count;

		i++;
	}

	//up-right row-- col++

	i = 1;

	while(row - i >= 0 && col + i < MAX_COLS)
	{
		if(getCell(row - i, col + i) == player)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			if(returnType == BOOLEAN)
				return true;
			else
				return count;

		i++;
	}

	// console.log("checkDiagonalTRBL():" + count);

	if(returnType == BOOLEAN)
		return false;
	else
		return count;
};

function checkWinner(row, col)
{
	return checkHorizontal(row, col, BOOLEAN, currentPlayer) || checkVertical(row, col, BOOLEAN, currentPlayer) || checkDiagonalTLBR(row, col, BOOLEAN, currentPlayer) || checkDiagonalTRBL(row, col, BOOLEAN, currentPlayer);
};

function putCircle(col)
{
	row = getRowOfEmptyCell(col);
	console.log("turnCount: " + turnCount);

	console.log(currentPlayer + " putCircle: (" + row + ", " + col + ")");
	
	if(row > -1)
	{	
		setCell(row, col, currentPlayer);
		//printBoard();
		modifyCellDesign(row, col);
		if(!checkWinner(row, col))
		{
			switchPlayer();
		}
		else
		{
			alert("Winner: " + getPlayerColorName() + "!");
			init();
			location.reload();
		}
		turnCount++;
		if(turnCount > MAX_TURNS && !checkWinner(row, col))
		{
			alert("Draw! No more possible moves.");
			init();
			location.reload();
			return false;
		}
	}
	else
	{
		alert("Invalid move: " + getPlayerColorName() + "!");
		return false;
	}

	return true;
};

function getPlayerColor()
{
	if(currentPlayer == 1)
		return 'white';
	else
		return '#e71840';
};

function getPlayerColorName()
{
	if(currentPlayer == 1)
		return 'white';
	else
		return 'pink';
};

function selectCellElement(row, col)
{
	return $("#board")[0].rows[row].cells[col];
};

function modifyCellDesign(row, col)
{
	$(selectCellElement(row, col)).css('background-color', getPlayerColor());
	$(selectCellElement(row, col)).css('border-color', getPlayerColor());
	$(selectCellElement(row, col)).css('-webkit-transition-property', 'all 300ms ease-in');
	$(selectCellElement(row, col)).css('-moz-transition-property', 'all 300ms ease-in');
	$(selectCellElement(row, col)).css('-o-transition-property', 'all 300ms ease-in');
	$(selectCellElement(row, col)).css('transition', 'all 300ms ease-in');
};

//START PVC

init();

function putCircle_pvc(col)
{
	if(putCircle(col))
		putCircle(aiThink());
};

function putCircle_cvc()
{
	var flag = putCircle(aiThink());

	if(flag)
		setTimeout(function(){putCircle_cvc();}, 500);
}

function aiThink()
{
	var selectedCols = [];
	var selectedCol = -1;
	var scores = [];
	var row;
	var col;
	var i;

	console.log("Start AI.");

	for(col = 0; col < MAX_COLS; col++)
	{
		console.log("Evaluating column " + col + ".");
		row = getRowOfEmptyCell(col);
		if(row > -1)
		{
			var colScores = [];
			var colScore = 0;

			setCell(row, col, currentPlayer);

			colScores.push(checkHorizontal(row, col, INTEGER, currentPlayer));
			colScores.push(checkVertical(row, col, INTEGER, currentPlayer));
			colScores.push(checkDiagonalTLBR(row, col, INTEGER, currentPlayer));
			colScores.push(checkDiagonalTRBL(row, col, INTEGER, currentPlayer));

			setCell(row, col, oppositePlayer());

			colScores.push(checkHorizontal(row, col, INTEGER, oppositePlayer()));
			colScores.push(checkVertical(row, col, INTEGER, oppositePlayer()));
			colScores.push(checkDiagonalTLBR(row, col, INTEGER, oppositePlayer()));
			colScores.push(checkDiagonalTRBL(row, col, INTEGER, oppositePlayer()));

			console.log("Column " + col + " raw scores:" + colScores);

			setCell(row, col, '0');

			for(i = 0; i < colScores.length / 2; i++)
			{
				if(colScores[i] == 4)
				{
					colScores[i] *= 15000;
					break;
				}
				else if(colScores[i] == 3)
				{
					colScores[i] *= 100;
				}
				else if(colScores[i] == 2)
				{
					colScores[i] *= 10;
				}
				else if(colScores[i] == 1)
				{
					colScores[i] *= 5;
				}
			}

			for(i = colScores.length / 2; i < MAX_COLS; i++)
			{
				if(colScores[i] == 4)
				{
					colScores[i] *= 9000;
					break;
				}
				else if(colScores[i] == 3)
				{
					colScores[i] *= 50;
				}
				else if(colScores[i] == 2)
				{
					colScores[i] *= 5;
				}
				else if(colScores[i] == 1)
				{
					colScores[i] *= 1;
				}
			}

			for(i = 0; i < colScores.length; i++)
				colScore += colScores[i];

			console.log("Column " + col + " scores:" + colScores);
			console.log("Column " + col + " score:" + colScore);

			scores.push(colScore);
		}
		else
		{
			console.log("Column " + col + " skipped.");
			scores.push(-1);
		}
	}

	console.log("Scores: " + scores);

	var max = 0;

	for(i = 0; i < scores.length; i++)
	{
		if(scores[i] > max)
		{
			selectedCols = [];
			max = scores[i];
			selectedCols.push(i);
		}
		else if(scores[i] == max)
		{
			max = scores[i];
			selectedCols.push(i);
		}
	}

	console.log("Selected columns: " + selectedCols);

	if(selectedCols.length > 1)
	{
		var index;

		do
		{
			index = Math.floor(Math.random() * 10);
		} while(index >= selectedCols.length);

		console.log("Selected column: " + index + " with score " + max + ".");

		return selectedCols[index];
	}
	else
	{
		console.log("Selected column: " + selectedCols[0] + " with score " + max + ".");
		return selectedCols[0];
	}
}