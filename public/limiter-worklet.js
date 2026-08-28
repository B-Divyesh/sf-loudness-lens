class LookAheadLimiter extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const settings = options.processorOptions || {};
    this.ceiling = settings.ceiling || 0.5;
    this.lookAhead = Math.max(1, Math.round(sampleRate * 0.01));
    this.buffers = [];
    this.gainBuffer = new Float32Array(this.lookAhead);
    this.index = 0;
    this.envelope = 1;
    this.frames = 0;
    this.port.onmessage = (event) => {
      if (typeof event.data.ceiling === 'number') this.ceiling = event.data.ceiling;
    };
  }

  process(inputs, outputs) {
    const input = inputs[0];
    const output = outputs[0];
    if (!input.length) return true;

    while (this.buffers.length < input.length) {
      this.buffers.push(new Float32Array(this.lookAhead));
    }

    let maxReduction = 0;
    for (let i = 0; i < input[0].length; i += 1) {
      let peak = 0;
      for (let channel = 0; channel < input.length; channel += 1) {
        peak = Math.max(peak, Math.abs(input[channel][i] || 0));
      }
      const wanted = peak > this.ceiling ? this.ceiling / peak : 1;
      this.envelope = wanted < this.envelope
        ? wanted
        : Math.min(1, this.envelope + (1 - this.envelope) * 0.0025);
      const delayedGain = this.gainBuffer[this.index] || 1;
      this.gainBuffer[this.index] = this.envelope;
      maxReduction = Math.max(maxReduction, 1 - delayedGain);

      for (let channel = 0; channel < output.length; channel += 1) {
        const ring = this.buffers[Math.min(channel, this.buffers.length - 1)];
        const delayed = ring[this.index];
        ring[this.index] = input[Math.min(channel, input.length - 1)][i] || 0;
        output[channel][i] = delayed * delayedGain;
      }
      this.index = (this.index + 1) % this.lookAhead;
    }

    this.frames += input[0].length;
    if (this.frames >= sampleRate / 15) {
      this.port.postMessage({ reduction: maxReduction });
      this.frames = 0;
    }
    return true;
  }
}

registerProcessor('look-ahead-limiter', LookAheadLimiter);
