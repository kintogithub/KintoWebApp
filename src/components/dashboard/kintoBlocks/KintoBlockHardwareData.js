import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { FieldValidation, Toggle, Slider } from '../../forms'
import {
  required,
  isBetween64,
  isBetween1000
} from '../../../helpers/forms/validators'
import { lessThanFormat, allowFalse } from 'helpers/forms/formatters'
import { number } from 'helpers/forms/parsers'

const KintoBlockHardwareData = ({ isDedicatedCPU, resetCPUHandler }) => {
  const selectNumberOfCores = [1, 2, 4, 8, 16, 32, 64, 128]
  const sliderMarks = {
    50: '50%',
    60: '60%',
    70: '70%',
    80: '80%',
    90: '90%',
    100: '100%'
  }
  return (
    <div className="form-wrapper hardware-requirements">
      <h3>Hardware Requirements</h3>
      <h5>
        What resources do your KintoBlock need? You can still modify these
        settings later, alongside the advanced scaling options.
      </h5>

      <div className="form-body">
        <div className="memory">
          <div className="input-container">
            <Field
              name="memLimit"
              parse={number}
              label="Memory Limits"
              placeholder="64 - 262144 MB"
              component={FieldValidation}
              validate={[required, isBetween64]}
              normalize={lessThanFormat(262144)}
              type="number"
              help="Minimum amount of RAM your KintoBlock will run on once deployed."
            />
          </div>
          <div className="input-container">
            <Field
              name="memRequests"
              parse={number}
              label="Memory Requests"
              placeholder="64 - 262144 MB"
              component={FieldValidation}
              validate={[required, isBetween64]}
              normalize={lessThanFormat(262144)}
              type="number"
              help="Maximum amount of memory requests your KintoBlock will perform once deployed."
            />
          </div>
        </div>
        <div className="line" />
        <div className="cpu">
          <div className="toggle-wrapper">
            <Field
              onChange={resetCPUHandler}
              name="dedicatedCpu"
              label="Dedicated CPUs"
              component={Toggle}
              normalize={allowFalse}
              help="By default, we will allocate the chosen amount of processing power out of our shared pool so your costs stay low. But you can also decide whether your KintoBlock needs dedicated hardware."
            />
          </div>

          <div
            className={`limits-requests ${
              isDedicatedCPU ? '' : 'hide-important'
            }`}
          >
            <div className="input-container">
              <Field
                name="maxCpu"
                label="max # of CPU cores"
                parse={number}
                component={FieldValidation}
                validate={required}
                type="select"
                help="Maximum processing power / dedicated cores your Kintoblock will use once deployed."
              >
                <option>Number of cores</option>
                {selectNumberOfCores.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </Field>
            </div>
            <div className="input-container">
              <Field
                name="minCpu"
                label="min # of CPU cores"
                parse={number}
                placeholder="1 - 1000 m"
                component={FieldValidation}
                validate={required}
                type="select"
                help="Minimum processing power / dedicated cores your Kintoblock will use once deployed."
              >
                <option>Number of cores</option>
                {selectNumberOfCores.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))}
              </Field>
            </div>
          </div>
          <div
            className={`limits-requests ${
              isDedicatedCPU ? 'hide-important' : ''
            }`}
          >
            <div className="input-container">
              <Field
                name="maxCpu"
                label="CPU Limits"
                parse={number}
                placeholder="1 - 1000 m"
                component={FieldValidation}
                validate={[required, isBetween1000]}
                normalize={lessThanFormat(1000)}
                type="number"
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>
            <div className="input-container">
              <Field
                name="minCpu"
                label="CPU Requests"
                parse={number}
                placeholder="1 - 1000 m"
                component={FieldValidation}
                validate={[required, isBetween1000]}
                normalize={lessThanFormat(1000)}
                type="number"
                help="Starter pack is the programming language you would like to use for this project"
              />
            </div>
          </div>
        </div>
        <div className="line" />
        <div className="scaling">
          <Field
            name="scalingThreshold"
            label="Scaling Threshold"
            component={Slider}
            min={50}
            marks={sliderMarks}
            step={null}
            help="Starter pack is the programming language you would like to use for this project"
          />
        </div>
      </div>
    </div>
  )
}
KintoBlockHardwareData.propTypes = {
  isDedicatedCPU: PropTypes.bool,
  resetCPUHandler: PropTypes.func.isRequired
}

export default KintoBlockHardwareData
