import { Input, message, Modal, Space } from 'antd';
import InstanceSelect from '../../../../../components-sys/InstanceSelect';
import React, { useEffect, useState } from 'react';
import {
  engine,
  PayloadType,
  RegisterEvent,
  RegisterEventStep,
  RegisterEventStepType,
} from '../../../../../core';
import { genEventUuid } from '../../../../../core';
import classNames from 'classnames';
import AddEventStepButton from './components/AddEventStepButton';
import { DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import InstanceExposeSelect from '../../../../../components-sys/InstanceExposeSelect';
import GlobalVariableSelect from '../../../../../components-sys/GlobalVariableSelect';
import { itemClass, itemSelectClass } from './style';
import PayloadTypeSelect from './components/PayloadTypeSelect';
import VariableInput from './components/VariableInput';
import { cloneDeep } from 'lodash';
import IEmpty from '../../../../../components-sys/IEmpty';

const stepTypeNameMap: {
  [KEY: string]: string;
} = {
  event: '触发组件',
  globalVar: '修改全局变量',
  openUrl: '打开新页面',
  jumpUrl: '跳转页面',
};

/**
 * 实例注册触发事件 - 对话框
 */

interface IProps {
  visible?: boolean;
  event?: RegisterEvent;
  onCancel?: () => void;
  onOk?: (event: RegisterEvent) => void;
}
export default function AddEventDialog(props: IProps) {
  const [isExpand, setIsExpand] = useState(true);

  const [steps, setSteps] = useState<RegisterEventStep[]>([]);
  const [currentStep, setCurrentStep] = useState<RegisterEventStep>();

  const isPayloadObject = typeof currentStep?.payload === 'object' && currentStep?.payload;

  function createNewStep(type: RegisterEventStepType): RegisterEventStep {
    return {
      stepId: genEventUuid(),
      type,
    };
  }

  function handleDelete(step: RegisterEventStep) {
    const isDeleteSelect = currentStep?.stepId === step.stepId;
    const newSteps = steps.filter((x) => x.stepId !== step.stepId);
    setSteps(newSteps);
    if (isDeleteSelect) {
      setCurrentStep(newSteps?.[0]);
    }
  }

  function handleAddStep(type: RegisterEventStepType) {
    const step = createNewStep(type);
    setCurrentStep(step);
    setSteps([...steps, step]);
  }

  function updateStep(newStep: RegisterEventStep) {
    setCurrentStep(newStep);
    const target = steps.find((x) => x.stepId === currentStep?.stepId);
    Object.assign(target || {}, newStep);
  }

  function renderPayload(payloadType?: PayloadType): React.ReactNode {
    if (payloadType === 'globalVar') {
      return (
        <GlobalVariableSelect
          style={{ width: 200 }}
          value={currentStep?.payload}
          onChange={(payload) => {
            if (!currentStep) return;
            updateStep({
              ...currentStep,
              payload,
            });
          }}
        />
      );
    }

    if (currentStep?.payloadType === 'custom') {
      return (
        <VariableInput
          style={{ flex: 1 }}
          value={currentStep.payload}
          onChange={(payload) => {
            currentStep &&
              updateStep({
                ...currentStep,
                payload,
              });
          }}
        />
      );
    }
    return <div style={{ lineHeight: '32px' }}>默认值</div>;
  }

  function handleOk() {
    if (!props?.event) {
      message.warn('event不存在');
      return;
    }
    props?.onOk?.({
      ...props?.event,
      steps,
    });
  }

  useEffect(() => {
    if (props?.visible) {
      const steps: RegisterEventStep[] = cloneDeep(props?.event?.steps || []);
      setSteps(steps);
      setCurrentStep(steps?.[0]);
    }
  }, [props?.visible]);

  return (
    <Modal
      centered
      destroyOnClose
      open={props?.visible}
      title={`${props?.event?.eventType} 事件`}
      width={800}
      zIndex={engine.global.maxZIndex}
      bodyStyle={{
        height: 450,
        overflowY: 'auto',
        display: 'flex',
        padding: 0,
      }}
      onCancel={props?.onCancel}
      onOk={handleOk}
    >
      <Space
        direction={'vertical'}
        size={0}
        style={{
          flex: 1,
          borderRight: '1px solid #e8e8e8',
        }}
      >
        {steps?.map((step) => {
          const isSelect = currentStep?.stepId === step.stepId;
          return (
            <div
              key={step.stepId}
              className={classNames(itemClass, isSelect && itemSelectClass)}
              onClick={() => {
                if (!currentStep || currentStep.stepId !== step.stepId) {
                  setCurrentStep(step);
                }
              }}
            >
              {stepTypeNameMap[step.type]}

              <a
                onClick={(e) => {
                  handleDelete(step);
                  e.stopPropagation();
                }}
              >
                <DeleteOutlined />
              </a>
            </div>
          );
        })}
        <div style={{ padding: '8px 12px' }}>
          <AddEventStepButton onSelect={handleAddStep} />
        </div>
      </Space>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 3,
        }}
      >
        {currentStep && (
          <>
            <Space direction={'vertical'} style={{ padding: '12px 16px', flex: 1 }}>
              {currentStep?.type === 'event' && (
                <>
                  <Space>
                    目标组件：
                    <InstanceSelect
                      style={{ width: 200 }}
                      value={currentStep.event?.id}
                      onChange={(id: string = '') => {
                        updateStep({
                          ...currentStep,
                          event: {
                            ...currentStep?.event,
                            id,
                            eventType: undefined,
                          },
                        });
                      }}
                    />
                  </Space>
                  <Space>
                    目标事件：
                    <InstanceExposeSelect
                      value={currentStep.event?.eventType}
                      style={{ width: 200 }}
                      insId={currentStep?.event?.id}
                      onChange={(eventType: string = '') => {
                        updateStep({
                          ...currentStep,
                          event: {
                            ...currentStep?.event,
                            eventType,
                          },
                        });
                      }}
                    />
                  </Space>
                </>
              )}
              {currentStep?.type === 'globalVar' && (
                <>
                  <Space>
                    全局变量：
                    <GlobalVariableSelect
                      style={{ width: 200 }}
                      allowClear
                      value={currentStep.globalVar?.vId}
                      onChange={(vId) => {
                        updateStep({
                          ...currentStep,
                          globalVar: {
                            ...currentStep?.globalVar,
                            vId,
                          },
                        });
                      }}
                    />
                  </Space>
                </>
              )}
              {currentStep?.type === 'openUrl' && (
                <>
                  <Space>
                    打开地址：
                    <Input
                      style={{ width: 400 }}
                      placeholder={'请输入'}
                      value={currentStep.url}
                      onChange={(e) => {
                        updateStep({
                          ...currentStep,
                          url: e.target.value,
                        });
                      }}
                    />
                  </Space>
                </>
              )}
              {currentStep?.type === 'jumpUrl' && (
                <>
                  <Space>
                    跳转地址：
                    <Input
                      style={{ width: 400 }}
                      placeholder={'请输入'}
                      value={currentStep.url}
                      onChange={(e) => {
                        updateStep({
                          ...currentStep,
                          url: e.target.value,
                        });
                      }}
                    />
                  </Space>
                </>
              )}
            </Space>
            <Space
              direction={'vertical'}
              style={{
                padding: '12px 16px',
                overflowY: 'auto',
                flex: isExpand ? 2 : undefined,
                borderTop: '1px solid #e8e8e8',
              }}
            >
              <>
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>[传参]</span>
                  <a onClick={() => setIsExpand(!isExpand)}>
                    {isExpand ? (
                      <Space>
                        收起
                        <DownOutlined />
                      </Space>
                    ) : (
                      <Space>
                        展开
                        <UpOutlined />
                      </Space>
                    )}
                  </a>
                </div>
                {isExpand && (
                  <>
                    <Space>
                      参数类型：
                      <PayloadTypeSelect
                        style={{ width: 200 }}
                        value={currentStep?.payloadType || 'default'}
                        onChange={(payloadType: any) => {
                          if (!currentStep) return;
                          updateStep({
                            ...currentStep,
                            payload: undefined,
                            payloadType,
                          });
                        }}
                      />
                    </Space>
                    {['globalVar', 'custom'].includes(currentStep?.payloadType || '') && (
                      <div
                        style={{
                          display: 'flex',
                          gap: 8,
                          alignItems: isPayloadObject ? 'flex-start' : 'center',
                        }}
                      >
                        携带参数：
                        {renderPayload(currentStep?.payloadType)}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 8 }}>
                      解析函数：
                      <Input.TextArea
                        placeholder={'请输入'}
                        value={currentStep?.payloadParser}
                        style={{ flex: 1 }}
                        autoSize={{
                          minRows: 5,
                          maxRows: 5,
                        }}
                        onChange={(e) => {
                          currentStep &&
                            updateStep({
                              ...currentStep,
                              payloadParser: e.target.value,
                            });
                        }}
                      />
                    </div>
                  </>
                )}
              </>
            </Space>
          </>
        )}
        {!currentStep && <IEmpty />}
      </div>
    </Modal>
  );
}
