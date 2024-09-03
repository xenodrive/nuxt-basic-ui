<template>
  <div>
    <div class="flex flex-col items-start">
      <Toggle model-value>Hello</Toggle>
      <Toggle color="red-500" model-value>Hello</Toggle>
      <Toggle color="red-500" model-value readonly>Hello readonly</Toggle>
      <Toggle color="red-500" disabled>Hello disabled</Toggle>
      <Toggle color="red-500" model-value disabled>Hello disabled</Toggle>
      <Toggle color="red-100" model-value>Hello</Toggle>
      <Toggle color="emerald-600,red-600" model-value height="0.8rem" knob-size="1rem" knob-color="green-400,red-400">
        Hello
      </Toggle>
      <Toggle model-value>Hello</Toggle>
      <Toggle>Hello</Toggle>
    </div>
    <div class="flex items-baseline gap-4">
      <Toggle color="red-100" model-value>Hello</Toggle>
      <Toggle
        color="emerald-600,red-600"
        model-value
        height="0.8rem"
        width="2rem"
        knob-size="1rem"
        knob-color="green-400,red-400">
        Hello
      </Toggle>
      <Toggle model-value>Hello</Toggle>
      <Toggle
        color="emerald-600,red-600"
        model-value
        height="2.8rem"
        width="4rem"
        knob-size="2rem"
        knob-color="green-400,red-400">
        Hello
      </Toggle>
      Hello
    </div>
    <div>
      <Toggle color="red-100" model-value>Hello</Toggle>
      <Toggle
        color="emerald-600,red-600"
        model-value
        height="0.8rem"
        width="2rem"
        knob-size="1rem"
        knob-color="green-400,red-400">
        Hello
      </Toggle>
      <Toggle model-value>Hello</Toggle>
      <Toggle
        color="emerald-600,red-600"
        model-value
        height="2.8rem"
        width="4rem"
        knob-size="2rem"
        knob-color="green-400,red-400">
        Hello
      </Toggle>
      Hello
    </div>
  </div>
</template>
