let communicationButton = document.getElementById("communication-button");
let communicationResult = document.getElementById("communicationResult");


let communicationCalculate = () => {
   // event.preventDefault(); // Prevents the default form submission

    let bandwidth = Number(document.getElementById("communicationBandwidth").value);

    
   let quantizerLevelBitValue = Number(document.getElementById("quantizerLevelBit").value);

    let quantizerInputType = document.getElementById("quantizer-bits-level").value;

    let sourceEncoderRatio = Number(document.getElementById("sourceEncoderRatio").value);
    let channelEncoderRate = Number(document.getElementById("channelEncoderRate").value);
    let interleaverBits = Number(document.getElementById("InterleaverBits").value);

    if(quantizerInputType == "bits"){

        let samplingFreq = 2*bandwidth;
        let res = 2 ** quantizerLevelBitValue;
        let inputSourceBitRate = samplingFreq * quantizerLevelBitValue;
        let outputSourceBitRate = inputSourceBitRate * sourceEncoderRatio; 
        let outputChannelBitRate = outputSourceBitRate/channelEncoderRate;
        communicationResult.innerHTML = `<div> Levels : ${res} </div> <div>Sampling Frequency: ${samplingFreq} KHz</div>
        </div> <div>Input Source Bit Rate: ${inputSourceBitRate} Bit/sec</div></div> <div>Output Source Bit Rate: ${outputSourceBitRate} Bit/Sec</div>
        <div>Output Channel Encoder Bit Rate: ${outputChannelBitRate} Kbps</div><div>Output Bit Rate at the interleaver: ${outputChannelBitRate} bits</div>`

    } else{
        let samplingFreq = 2*bandwidth;
        let res = Math.log2(quantizerLevelBitValue);
        res = Math.ceil(res);
        let inputSourceBitRate = samplingFreq * res;
        let outputSourceBitRate = inputSourceBitRate * sourceEncoderRatio; 
        let outputChannelBitRate = outputSourceBitRate/channelEncoderRate;
        communicationResult.innerHTML = `<div> Bits : ${res} </div> <div>Sampling Frequency: ${samplingFreq} KHz</div>
        </div> <div>Input Source Bit Rate: ${inputSourceBitRate} Bit/sec</div></div> <div>Output Source Bit Rate: ${outputSourceBitRate} Bit/Sec</div>
        <div>Output Channel Encoder Bit Rate: ${outputChannelBitRate} Kbps</div><div> Output Bit Rate at the interleaver: ${outputChannelBitRate} bits</div>`


    }



//    communicationResult.innerHTML = `<div> Bandwidth: ${bandwidth.toFixed(2)}  </div>`

    console.log(bandwidth,quantizerLevelBitValue,quantizerInputType,sourceEncoderRatio,channelEncoderRate);
    


};

communicationButton.addEventListener("click",communicationCalculate);
//window.addEventListener("load",communicationCalculate);

// Question 2 ---------------------------------------------------------------------------------------------------------------------





