var currentPlayer;
var board;
var MAX_ROWS = 6;
var MAX_COLS = 7;
var MAX_TURNS = 42;
var turnCount;

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

function checkHorizontal(row, col)
{
	var i;
	var count = 0;

	//left
	for(i = col; i >= 0; i--)
	{
		if(getCell(row, i) == currentPlayer)
		{
			count++;
		}
		else
			break;
		
		if(count >= 4)
			return true;
	}

	//right
	for(i = col + 1; i < MAX_COLS; i++)
	{
		if(getCell(row, i) == currentPlayer)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			return true;
	}

	console.log("checkHorizontal():" + count);

	return false;
};

function checkVertical(row, col)
{
	var i;
	var count = 0;

	//down
	for(i = row; i < MAX_ROWS; i++)
	{
		if(getCell(i, col) == currentPlayer)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			return true;
	}

	console.log("checkVertical():" + count);
	return false;
};

function checkDiagonalTLBR(row, col)
{
	var i;
	var count = 0;

	//down-right row++ col++

	i = 0;

	while(row + i < MAX_ROWS && col + i < MAX_COLS)
	{
		if(getCell(row + i, col + i) == currentPlayer)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			return true;

		i++;
	}

	//up-left row-- col--

	i = 1;

	while(row - i >= 0 && col - i >= 0)
	{
		if(getCell(row - i, col - i) == currentPlayer)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			return true;

		i++;
	}

	console.log("checkDiagonalTLBR():" + count);
	return false;
};

function checkDiagonalTRBL(row, col)
{
	var i;
	var count = 0;

	//down-left row++ col--

	i = 0;

	while(row + i < MAX_ROWS && col - i >= 0)
	{
		if(getCell(row + i, col - i) == currentPlayer)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			return true;

		i++;
	}

	//up-right row-- col++

	i = 1;

	while(row - i >= 0 && col + i < MAX_COLS)
	{
		if(getCell(row - i, col + i) == currentPlayer)
		{
			count++;
		}
		else
			break;

		if(count >= 4)
			return true;

		i++;
	}

	console.log("checkDiagonalTRBL():" + count);
	return false;
};

function checkWinner(row, col)
{
	return checkHorizontal(row, col) || checkVertical(row, col) || checkDiagonalTLBR(row, col) || checkDiagonalTRBL(row, col);
};

function putCircle(col)
{
	row = getRowOfEmptyCell(col);
	console.log("turnCount: " + turnCount);
	if(turnCount > MAX_TURNS)
	{
		alert("Draw! No more possible moves.");
		init();
		location.reload();
	}
	else if(row > -1)
	{	
		setCell(row, col, currentPlayer);
		//printBoard();
		modifyCellDesign(row, col);
		if(!checkWinner(row, col))
			switchPlayer();
		else
		{
			alert("Winner: " + getPlayerColorName() + "!");
			init();
			location.reload();
		}
		turnCount++;
	}
	else
	{
		alert("Invalid move: " + getPlayerColorName() + "!");
	}
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

init();