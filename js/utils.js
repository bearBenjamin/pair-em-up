export function createElement(tag, attributes = {}, ...childrens) {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "className") {
      element.className = value;
    } else if (key.startsWith("data-")) {
      element.setAttribute(key, value);
    } else {
      element[key] = value;
    }
  });

  childrens.forEach((child) => {
    if (typeof child === "string") {
      const textNode = document.createTextNode(child);
      element.appendChild(textNode);
    }

    if (child instanceof HTMLElement) {
      element.appendChild(child);
    }
  });
  return element;
}

export function getGrid(mode) {
  console.log('mode: ', mode);
  let grid;
  switch (mode) {
    case 'classic':
      grid = Array.from({ length: 3 }, (_, rowIndex) => {
        return Array.from({ length: 9 }, (_, colIndex) => {
          switch (rowIndex) {
            case 0 :
              return colIndex + 1;
            case 1 :
              return colIndex % 2 === 0 ? 1 : Math.floor(colIndex / 2) + 1;
            case 2 :
              return colIndex % 2 === 0 ? (colIndex / 2 + 5) : 1;
          }
        });
      });
    break;

    case 'random' :
      grid = Array.from({ length: 3 }, (_, rowIndex) => {
        return Array.from({ length: 9 }, (_, colIndex) => {
          switch (rowIndex) {
            case 0 :
              return colIndex + 1;
            case 1 :
              return colIndex % 2 === 0 ? 1 : Math.floor(colIndex / 2) + 1;
            case 2 :
              return colIndex % 2 === 0 ? (colIndex / 2 + 5) : 1;
          }
        });
      });
      grid = shuffleElement(grid);
    break;

    case 'chaotic' :
    grid = Array.from({ length: 3 }, () => {
      return Array.from({ length: 9}, (_, colIndex) => {
            return colIndex = Math.floor(Math.random() * 9) + 1;
        });
      });
  }
  return grid.flat();
}

function shuffleElement(array) {
  const arr = array.slice().flat();
  
  for (let i = arr.length - 1; i > 0; i -= 1) {
     const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function addMoveToHistory(state, index1, index2, value1, value2, points) {
  const move = {
    moveIndex: state.history.length + 1,
    cell1Index: index1,
    cell2Index: index2,
    cell1Value: value1,
    cell2Value: value2,
    pointsScored: points,
    scoreBeforeMove: state.score,
  };
  state.history.push(move);
}