import * as React from 'react'

import { TokenAnnotator } from 'react-text-annotate'

const TEXT = `109277792 109277792 RWH 3477400 810976 7792902 01/30/2004 12:00:00 AM ED Discharge Summary Unsigned DIS ~~~ Report Status ~~~ Unsigned ED DISCHARGE NOTIFICATION / SUMMARY SHUFFSKOCKOTESKI, DRU ~~~ MRN ~~~ 3477400 ~~~ Age ~~~ 51y ~~~ REGISTRATION DATE ~~~ 01/30/2004 01:59 AM ~~~ Provider ~~~ KOMAND SILBEDOUETTLAND PRELIMINARY REPORT ~~~ PCP notified by MD ~~~ No - Other explanation ~~~ Benefits Assigned ~~~ N ~~~ Discharge Date / Time ~~~ 01/30/2004 08:28 ~~~ Discharge Status ~~~ Discharged ~~~ Condition on Discharge ~~~ Stable ~~~ Patient States Complaint ~~~ AGGRAVATED / NEEDS APS EVAL ~~~ Diagnosis ~~~ Impulsivity ~~~ 1`

const TAG_COLORS = {
  ORG: '#00ffa2',
  PERSON: '#84d2ff',
}

const Card = ({children}) => (
  <div
    style={{
      boxShadow: '0 2px 4px rgba(0,0,0,.1)',
      margin: 6,
      maxWidth: 500,
      padding: 16,
    }}
  >
    {children}
  </div>
)

class App extends React.Component<any, any> {
  state = {
    //value: [{start: 17, end: 19, tag: 'PERSON'}],
    //tag: 'PERSON',
      value: [],
      tag: '',
  }

  handleChange = value => {
    this.setState({value})
  }

  handleTagChange = e => {
    this.setState({tag: e.target.value})
  }

  render() {
    return (
      <div style={{padding: 24, fontFamily: 'IBM Plex Sans'}}>
        <h3 style={{marginTop: 0}}>react-text-annotate</h3>
        <p>A React component for interactively highlighting parts of text.</p>
        <div style={{display: 'flex', marginBottom: 24}}>
          <Card>
            <h4>Default</h4>
            <select onChange={this.handleTagChange} value={this.state.tag}>
              <option value="CONDITION">CONDITION</option>
              <option value="DISCHARGE">DISCHARGE</option>
            </select>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
            />
          </Card>
          <Card>
            <h4>Custom rendered mark</h4>
            <select onChange={this.handleTagChange} value={this.state.tag}>
                <option value="CONDITION">CONDITION</option>
                <option value="DISCHARGE">DISCHARGE</option>
            </select>
            <TokenAnnotator
              style={{
                fontFamily: 'IBM Plex Sans',
                maxWidth: 500,
                lineHeight: 1.5,
              }}
              tokens={TEXT.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag],
              })}
              renderMark={props => (
                <mark
                  key={props.key}
                  onClick={() => props.onClick({start: props.start, end: props.end})}
                >
                  {props.content} [{props.tag}]
                </mark>
              )}
            />
          </Card>
        </div>
        <Card>
          <h4>Current Value</h4>
          <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
        </Card>
      </div>
    )
  }
}

export default App
