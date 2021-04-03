import React, { useContext } from 'react';
import TweetsContext from '../../contexts/TweetsContext';
import './styles.global.css';

/**
 * Define the interface to Spinner props.
 */
interface Props {
  text?: string;
}

/**
 * Function to define the common Spinner component.
 * @param props Is the Props object.
 * @returns The React component.
 */
export default function Spinner({ text = '' }: Props) {
  const { loading } = useContext(TweetsContext);

  return loading ? (
    <div id="loader-wrapper">
      <div id="loader" />
      {text.length > 0 ? <p>{text}</p> : null}
    </div>
  ) : null;
}

Spinner.defaultProps = {
  text: '',
};
