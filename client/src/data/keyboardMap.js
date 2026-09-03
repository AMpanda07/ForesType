export const KEYBOARD_ROWS = [
  [
    { key: '`', label: '`', finger: 'left-pinky' },
    { key: '1', label: '1', finger: 'left-pinky' },
    { key: '2', label: '2', finger: 'left-ring' },
    { key: '3', label: '3', finger: 'left-middle' },
    { key: '4', label: '4', finger: 'left-index' },
    { key: '5', label: '5', finger: 'left-index' },
    { key: '6', label: '6', finger: 'right-index' },
    { key: '7', label: '7', finger: 'right-index' },
    { key: '8', label: '8', finger: 'right-middle' },
    { key: '9', label: '9', finger: 'right-ring' },
    { key: '0', label: '0', finger: 'right-pinky' },
    { key: '-', label: '-', finger: 'right-pinky' },
    { key: '=', label: '=', finger: 'right-pinky' },
    { key: 'Backspace', label: '⌫', width: 'flex-1.5', finger: 'right-pinky' }
  ],
  [
    { key: 'Tab', label: 'Tab', width: 'flex-1.5', finger: 'left-pinky' },
    { key: 'q', label: 'Q', finger: 'left-pinky' },
    { key: 'w', label: 'W', finger: 'left-ring' },
    { key: 'e', label: 'E', finger: 'left-middle' },
    { key: 'r', label: 'R', finger: 'left-index' },
    { key: 't', label: 'T', finger: 'left-index' },
    { key: 'y', label: 'Y', finger: 'right-index' },
    { key: 'u', label: 'U', finger: 'right-index' },
    { key: 'i', label: 'I', finger: 'right-middle' },
    { key: 'o', label: 'O', finger: 'right-ring' },
    { key: 'p', label: 'P', finger: 'right-pinky' },
    { key: '[', label: '[', finger: 'right-pinky' },
    { key: ']', label: ']', finger: 'right-pinky' }
  ],
  [
    { key: 'CapsLock', label: 'Caps', width: 'flex-1.8', finger: 'left-pinky' },
    { key: 'a', label: 'A', finger: 'left-pinky', home: true },
    { key: 's', label: 'S', finger: 'left-ring', home: true },
    { key: 'd', label: 'D', finger: 'left-middle', home: true },
    { key: 'f', label: 'F', finger: 'left-index', home: true },
    { key: 'g', label: 'G', finger: 'left-index' },
    { key: 'h', label: 'H', finger: 'right-index' },
    { key: 'j', label: 'J', finger: 'right-index', home: true },
    { key: 'k', label: 'K', finger: 'right-middle', home: true },
    { key: 'l', label: 'L', finger: 'right-ring', home: true },
    { key: ';', label: ';', finger: 'right-pinky', home: true },
    { key: "'", label: "'", finger: 'right-pinky' },
    { key: 'Enter', label: 'Enter ↵', width: 'flex-2', finger: 'right-pinky' }
  ],
  [
    { key: 'Shift', label: 'Shift ⇧', width: 'flex-2.3', finger: 'left-pinky' },
    { key: 'z', label: 'Z', finger: 'left-pinky' },
    { key: 'x', label: 'X', finger: 'left-ring' },
    { key: 'c', label: 'C', finger: 'left-middle' },
    { key: 'v', label: 'V', finger: 'left-index' },
    { key: 'b', label: 'B', finger: 'left-index' },
    { key: 'n', label: 'N', finger: 'right-index' },
    { key: 'm', label: 'M', finger: 'right-index' },
    { key: ',', label: ',', finger: 'right-middle' },
    { key: '.', label: '.', finger: 'right-ring' },
    { key: '/', label: '/', finger: 'right-pinky' },
    { key: 'ShiftRight', label: 'Shift ⇧', width: 'flex-2.3', finger: 'right-pinky' }
  ],
  [
    { key: 'Space', label: 'Space Bar', width: 'flex-grow', finger: 'thumb' }
  ]
];

export const FINGER_COLORS = {
  'left-pinky': '#4A7C59',
  'left-ring': '#3A6B49',
  'left-middle': '#5C8A67',
  'left-index': '#72A96B',
  'thumb': '#8FCF83',
  'right-index': '#72A96B',
  'right-middle': '#5C8A67',
  'right-ring': '#3A6B49',
  'right-pinky': '#4A7C59'
};

export const DRILL_CATEGORIES = [
  { id: 'home_row', name: 'Home Row', chars: 'asdfghjkl;' },
  { id: 'top_row', name: 'Top Row', chars: 'qwertyuiop' },
  { id: 'bottom_row', name: 'Bottom Row', chars: 'zxcvbnm,.' },
  { id: 'left_hand', name: 'Left Hand', chars: 'qwerasdfzxcv12345' },
  { id: 'right_hand', name: 'Right Hand', chars: 'yuiophjkl;bnm,67890' },
  { id: 'numbers', name: 'Numbers', chars: '1234567890' },
  { id: 'punctuation', name: 'Punctuation', chars: '.,;:!?"\'()-[]' },
  { id: 'mixed_mastery', name: 'Mixed Mastery', chars: 'abcdefghijklmnopqrstuvwxyz1234567890.,;' }
];
