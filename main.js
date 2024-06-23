let communicationButton = document.getElementById("communication-button");
let communicationResult = document.getElementById("communicationResult");

let powerButton = document.getElementById("power-button");
let powerResult = document.getElementById("powerResult");

let throughputButton = document.getElementById("throughput-button");
let throughputResult = document.getElementById("throughputResult");


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
        <div>Output Channel Encoder Bit Rate: ${outputChannelBitRate} Kbps</div><div>Output Bit Rate at the interleaver: ${outputChannelBitRate} Kbps</div>`

    } else{
        let samplingFreq = 2*bandwidth;
        let res = Math.log2(quantizerLevelBitValue);
        res = Math.ceil(res);
        let inputSourceBitRate = samplingFreq * res;
        let outputSourceBitRate = inputSourceBitRate * sourceEncoderRatio; 
        let outputChannelBitRate = outputSourceBitRate/channelEncoderRate;
        communicationResult.innerHTML = `<div> Bits : ${res} </div> <div>Sampling Frequency: ${samplingFreq} KHz</div>
        </div> <div>Input Source Bit Rate: ${inputSourceBitRate} Bit/sec</div></div> <div>Output Source Bit Rate: ${outputSourceBitRate} Bit/Sec</div>
        <div>Output Channel Encoder Bit Rate: ${outputChannelBitRate} Kbps</div><div> Output Bit Rate at the interleaver: ${outputChannelBitRate} Kbps</div>`


    }



//    communicationResult.innerHTML = `<div> Bandwidth: ${bandwidth.toFixed(2)}  </div>`

    console.log(bandwidth,quantizerLevelBitValue,quantizerInputType,sourceEncoderRatio,channelEncoderRate);
    


};

communicationButton.addEventListener("click",communicationCalculate);
//window.addEventListener("load",communicationCalculate);

// ---------------------------------------------OFDM Caluclator-------------------------------------------------------

// OFDM Calculator
let ofdmButton = document.getElementById("ofdm-button");
let ofdmResult = document.getElementById("ofdmResult");

let ofdmCalculate = () => {
    let bandwidth = Number(document.getElementById("ofdmBandwidth").value);
    let bandwidthUnit = document.getElementById("ofdmBandwidthUnit").value;
    let subcarrierSpacing = Number(document.getElementById("subcarrierSpacing").value);
    let subcarrierSpacingUnit = document.getElementById("subcarrierSpacingUnit").value;
    let resourceBlockDuration = Number(document.getElementById("resourceBlockDuration").value);
    let resourceBlockDurationUnit = document.getElementById("resourceBlockDurationUnit").value;
    let number2n = Number(document.getElementById("number2n").value);
    let numberOfOfdm = Number(document.getElementById("numberOfOfdm").value);
    let parallelResourceBlock = Number(document.getElementById("parallelResourceBlock").value);

    if (bandwidthUnit === "KHz") bandwidth *= 1000;
    if (subcarrierSpacingUnit === "KHz") subcarrierSpacing *= 1000;
    if (resourceBlockDurationUnit === "msec") resourceBlockDuration /= 1000;

    let validationMessage = "";
    if (subcarrierSpacing >= bandwidth) {
        validationMessage += "<div>Subcarrier spacing must be less than bandwidth.</div>";
    }

    if (bandwidth % subcarrierSpacing !== 0) {
        validationMessage += "<div>The result of bandwidth divided by subcarrier spacing must be a whole number.</div>";
    }

    let numSubcarriers = bandwidth / subcarrierSpacing;
    let bitsPerResourceElement = Math.log2(number2n);
    let numOfdmSymbols = bitsPerResourceElement * numSubcarriers;
    let bitsPerOfdmResourceBlock = numberOfOfdm * numOfdmSymbols;
    let maxTransmissionRate = (parallelResourceBlock * bitsPerOfdmResourceBlock) / resourceBlockDuration;

    if (!validationMessage) {
        ofdmResult.innerHTML = `<div>Number of bits per resource element: ${bitsPerResourceElement}</div>
        <div>Number of OFDM symbols: ${numOfdmSymbols}</div>
        <div>Number of bits per OFDM resource block: ${bitsPerOfdmResourceBlock}</div>
        <div>Maximum transmission rate for the user: ${maxTransmissionRate} bits/second</div>`;
    } else {
        ofdmResult.innerHTML = validationMessage;
    }

    console.log(bandwidth, subcarrierSpacing, resourceBlockDuration, number2n, numberOfOfdm, parallelResourceBlock);
};

ofdmButton.addEventListener("click", ofdmCalculate);

// Question 3 ---------------------------------------------------------------------------------------------------------------------
const sixteenPSK = [
    { EbNo: 0, BER: 0.45 },
    { EbNo: 1, BER: 0.4 },
    { EbNo: 2, BER: 0.35 },
    { EbNo: 3, BER: 0.3 },
    { EbNo: 4, BER: 0.25 },
    { EbNo: 5, BER: 0.2 },
    { EbNo: 6, BER: 0.15 },
    { EbNo: 7, BER: 0.1 },
    { EbNo: 8, BER: 0.07 },
    { EbNo: 9, BER: 0.05 },
    { EbNo: 10, BER: 0.03 },
    { EbNo: 11, BER: 0.01 },
    { EbNo: 12, BER: 0.009 },
    { EbNo: 13, BER: 0.005 },
    { EbNo: 14, BER: 0.001 },
    { EbNo: 15, BER: 0.0003 },
    { EbNo: 16, BER: 0.0001 },
    { EbNo: 17, BER: 0.00004 },
    { EbNo: 18, BER: 0.000003 }
];

const eightPSK = [
    { EbNo: 0, BER: 0.25 },
    { EbNo: 1, BER: 0.2 },
    { EbNo: 2, BER: 0.1 },
    { EbNo: 3, BER: 0.08 },
    { EbNo: 4, BER: 0.06 },
    { EbNo: 5, BER: 0.04 },
    { EbNo: 6, BER: 0.02 },
    { EbNo: 7, BER: 0.01 },
    { EbNo: 8, BER: 0.008 },
    { EbNo: 9, BER: 0.005 },
    { EbNo: 10, BER: 0.001 },
    { EbNo: 11, BER: 0.0003 },
    { EbNo: 12, BER: 0.0001 },
    { EbNo: 13, BER: 0.00001 },
    { EbNo: 14, BER: 0.000001 },
    { EbNo: 15, BER: 0.00000005 }
];

const bpskQpsk = [
    { EbNo: 0, BER: 0.1 },
    { EbNo: 1, BER: 0.08 },
    { EbNo: 2, BER: 0.06 },
    { EbNo: 3, BER: 0.04 },
    { EbNo: 4, BER: 0.01 },
    { EbNo: 5, BER: 0.008 },
    { EbNo: 6, BER: 0.004 },
    { EbNo: 7, BER: 0.001 },
    { EbNo: 8, BER: 0.0002 },
    { EbNo: 9, BER: 0.00003 },
    { EbNo: 10, BER: 0.000003 },
    { EbNo: 11, BER: 0.0000004 },
    { EbNo: 12, BER: 0.00000001 }
];

let powerCalculate = () => {
    const W_to_dB = W => 10 * Math.log10(W);
    const dB_to_W = dB => Math.pow(10, dB / 10);
    const KdB = -228.6;

    const getElementValue = id => Number(document.getElementById(id).value);
    const getElementType = id => document.getElementById(id).value;

    let digitalModulationTechniqueT = getElementType("digitalModulationTechniqueT");
    let BER = getElementValue("BER");

    const convertValues = (value, type) => {
        if (type === "dB") {
            return { dB: value, watt: dB_to_W(value) };
        } else {
            return { dB: W_to_dB(value), watt: value };
        }
    };

    const getEbN0 = (modulation, ber) => {
        let modulationArray;
        if (modulation === "16PSK") {
            modulationArray = sixteenPSK;
        } else if (modulation === "8PSK") {
            modulationArray = eightPSK;
        } else if (modulation === "BPSK/QPSK") {
            modulationArray = bpskQpsk;
        } else {
            return null;
        }

        for (let i = 0; i < modulationArray.length; i++) {
            if (Math.abs(modulationArray[i].BER - ber) < 0.00001) {
                return modulationArray[i].EbNo;
            }
        }
        return null;
    };

    let EbN0 = getEbN0(digitalModulationTechniqueT, BER);

    let pathloss = getElementValue("pathloss");
    let pathlossT = getElementType("pathloss-dB-watt");
    let otherlosses = getElementValue("otherlosses");
    let otherlossesT = getElementType("otherlosses-dB-watt");
    let fademargin = getElementValue("fademargin");
    let fademarginT = getElementType("fademargin-dB-watt");
    let tranmitAntennaGain = getElementValue("tranmitAntennaGain");
    let tranmitAntennaGainT = getElementType("tranmitAntennaGain-dB-watt");
    let receiveAntennaGain = getElementValue("receiveAntennaGain");
    let receiveAntennaGainT = getElementType("receiveAntennaGain-dB-watt");
    let tranmitAmpliferGain = getElementValue("tranmitAmpliferGain");
    let tranmitAmpliferGainT = getElementType("tranmitAmpliferGain-dB-watt");
    let receiveAmpliferGain = getElementValue("receiveAmpliferGain");
    let receiveAmpliferGainT = getElementType("receiveAmpliferGain-dB-watt");
    let datarate = getElementValue("datarate");
    let datarateT = getElementType("datarate-kbps-dB");
    let noiseTemp = getElementValue("noiseTemp");
    let noiseTempT = getElementType("noiseTemp-kelvin-dB");
    let linkMargin = getElementValue("linkMargin");
    let linkMarginT = getElementType("linkMargin-dB-watt");
    let antennaFeedLineLoss = getElementValue("antennaFeedLineLoss");
    let antennaFeedLineLossT = getElementType("antennaFeedLineLoss-dB-watt");
    let noiseFigureTotal = getElementValue("noiseFigureTotal");
    let noiseFigureTotalT = getElementType("noiseFigureTotal-dB-watt");

    let pathlossConv = convertValues(pathloss, pathlossT);
    let otherlossesConv = convertValues(otherlosses, otherlossesT);
    let fademarginConv = convertValues(fademargin, fademarginT);
    let tranmitAntennaGainConv = convertValues(tranmitAntennaGain, tranmitAntennaGainT);
    let receiveAntennaGainConv = convertValues(receiveAntennaGain, receiveAntennaGainT);
    let tranmitAmpliferGainConv = convertValues(tranmitAmpliferGain, tranmitAmpliferGainT);
    let receiveAmpliferGainConv = convertValues(receiveAmpliferGain, receiveAmpliferGainT);
    let datarateConv = datarate * 1000; // Convert kbps to bps
    datarateConv = convertValues(datarateConv, datarateT);
    let noiseTempConv = convertValues(noiseTemp, noiseTempT);
    let linkMarginConv = convertValues(linkMargin, linkMarginT);
    let antennaFeedLineLossConv = convertValues(antennaFeedLineLoss, antennaFeedLineLossT);
    let noiseFigureTotalConv = convertValues(noiseFigureTotal, noiseFigureTotalT);

    let PowerTransmitdB = linkMarginConv.dB + pathlossConv.dB + antennaFeedLineLossConv.dB + otherlossesConv.dB + fademarginConv.dB + KdB + noiseTempConv.dB +
        noiseFigureTotalConv.dB + datarateConv.dB + EbN0 - (tranmitAntennaGainConv.dB + receiveAntennaGainConv.dB + tranmitAmpliferGainConv.dB + receiveAmpliferGainConv.dB);

    let PowerTransmitWatt = convertValues(PowerTransmitdB, "dB");

    let powerResult = document.getElementById("powerResult");
    powerResult.innerHTML = `<div> Power Transmitted (dB): ${PowerTransmitdB.toFixed(2)}</div>
        <div> Power Transmitted (Watt): ${PowerTransmitWatt.watt.toFixed(2)}</div>`;
};


powerButton.addEventListener("click", powerCalculate);

// Question 4 ---------------------------------------------------------------------------------------------------------------------
let throughputCalculate = () => {
    // event.preventDefault(); // Prevents the default form submission
 
     let bandwidthThroughput = Number(document.getElementById("bandwidthThroughput").value);
 
     let multipleAccessTechniqueType = document.getElementById("multipleAccessTechniqueT").value;
 
     let propagationTime = Number(document.getElementById("propagationTime").value);
     let frameSize = Number(document.getElementById("frameSize").value);
     let frameRate = Number(document.getElementById("frameRate").value);

     if(multipleAccessTechniqueType=="unslottedNonpersistent"){
        let T= (frameSize/bandwidthThroughput)/1000;
        let a= propagationTime/(T*1000000);
        let G= frameRate*1000*T;
        let aT = a*T;
        let aG= a*G;
        let throughput = ((G * Math.pow(Math.E, (-2 * aT))) / ((G * (1 + (2 * a))) + Math.pow(Math.E, (-1 * aG))))*100;
        throughputResult.innerHTML = `<div>Unslotted Nonpersistent Throughput: ${throughput.toFixed(2)}%</div>`;
        
     }else if (multipleAccessTechniqueType=="slottedNonpersistent"){
        let T= (frameSize/bandwidthThroughput)/1000;
        let a= propagationTime/(T*1000000);
        let G= frameRate*1000*T;
        let aT = a*T;
        let aG= a*G;
        let throughput = ((a*G * Math.pow(Math.E, (-2 * aT))) /(1 - Math.pow(Math.E, (-1 * aG))+a))*100;
        throughputResult.innerHTML = `<div>Slotted Nonpersistent Throughput: ${throughput.toFixed(2)}%</div>`;

     }else if(multipleAccessTechniqueType=="unslotted1-persistent"){
        let T = (frameSize / bandwidthThroughput) / 1000;
        let a = propagationTime / (T * 1000000);
        let G = frameRate * 1000 * T;
        let throughputNumerator = G * (1 + G + a * G * (1 + G + (a * G / 2))) * Math.exp(-G * (1 + 2 * a));
        let throughputDenominator = G * (1 + 2 * a) - (1 - Math.exp(-a * G)) + (1 + a * G) * Math.exp(-G * (1 + a));
        let throughput = (throughputNumerator / throughputDenominator) * 100;
        document.getElementById("throughputResult").innerHTML = `<div>Unslotted 1-persistent Throughput: ${throughput.toFixed(2)}%</div>`;
     }else{
        let T = (frameSize / bandwidthThroughput) / 1000;
        let a = propagationTime / (T * 1000000);
        let G = frameRate * 1000 * T;
        let throughputNumerator = G * (1 + a - Math.exp(-a * G)) * Math.exp(-G * (1 + a));
        let throughputDenominator = (1 + a) * (1 - Math.exp(-a * G)) + a * Math.exp(-G * (1 + a));
        let throughput = (throughputNumerator / throughputDenominator) * 100;
        document.getElementById("throughputResult").innerHTML = `<div>Slotted 1-persistent Throughput: ${throughput.toFixed(2)}%</div>`;
     }
};
throughputButton.addEventListener("click", throughputCalculate);




// Question 5 : 
document.getElementById('design-button').addEventListener('click', function() {
    
    
    function getN(probability, value) {
        // Remove '%' symbol and convert probability to string
        let probStr = probability.toString() + '%';
    
        // Search for the value in trafficData array
        for (let i = 0; i < trafficData.length; i++) {
            if (trafficData[i][probStr] >= value) {
                return trafficData[i].N;
            }
        }
    
        return null; // Return null if not found
    }
    
    
    
    
    // Get input values
    const area = Number(document.getElementById('area').value) * 1000000; // Convert Km^2 to m^2
    const subscribers = Number(document.getElementById('subscribers').value);
    const avgCallsPerDay = Number(document.getElementById('avgCallsPerDay').value);
    const avgCallDuration = Number(document.getElementById('avgCallDuration').value);
    const callDropProb = Number(document.getElementById('callDropProb').value);
    const minSIR = Number(document.getElementById('minSIR').value);
    const refPower = Number(document.getElementById('refPower').value);
    const refDistance = Number(document.getElementById('refDistance').value);
    const pathLossExp = Number(document.getElementById('pathLossExp').value);
    const receiverSensitivity = Number(document.getElementById('receiverSensitivity').value);
    let channenlsNum = Number(document.getElementById('timeslotsPerCarrier').value);

    // Convert dB values to linear scale
    const refPowerLinear = Math.pow(10, refPower / 10);
    const receiverSensitivityLinear = receiverSensitivity * Math.pow(10, -6); // Convert µW to W

    // Calculate maximum distance
    const maxDistance = refDistance * Math.pow(refPowerLinear / receiverSensitivityLinear, 1 / pathLossExp);

    // Calculate maximum cell size
    const maxCellSize = ((3 * Math.sqrt(3)) / 2) * Math.pow(maxDistance, 2);

    // Calculate number of cells in the service area
    const numberOfCells = area / maxCellSize;

    // Calculate traffic load in the whole cellular system in Erlangs
    const lambda = avgCallsPerDay / 86400; // Convert calls/day to calls/second
    const H = avgCallDuration * 60; // Convert minutes/call to seconds/call
    const trafficLoad = subscribers * lambda * H;

    // Calculate traffic load in each cell in Erlangs
    const trafficLoadPerCell = trafficLoad / numberOfCells;

    // Calculate the number of cells in each cluster
    const minSIRLinear = Math.pow(10, minSIR / 10); // Convert SIR from dB to linear scale
    const Nb = 6;
    //const N = Math.ceil(Math.pow(minSIRLinear * Nb, 1 / pathLossExp) / 3);
    let jazerN = Math.pow(minSIRLinear*Nb, 2/pathLossExp);
    let N = Math.ceil(jazerN/3);

    let Num = Math.ceil((getN(callDropProb*100, trafficLoadPerCell))/channenlsNum);
    

    // Display results
    document.getElementById('designResult').innerHTML = `
        <p>Maximum distance between transmitter and receiver for reliable communication: ${maxDistance.toFixed(2)} meters</p>
        <p>Maximum cell size assuming hexagonal cells: ${maxCellSize.toFixed(2)} square meters</p>
        <p>Number of cells in the service area: ${numberOfCells.toFixed(2)}</p>
        <p>Traffic load in the whole cellular system: ${trafficLoad.toFixed(3)} Erlangs</p>
        <p>Traffic load in each cell: ${trafficLoadPerCell.toFixed(3)} Erlangs</p>
        <p>Number of cells in each cluster: ${N}</p>
        <p>Minimum number of carriers needed to achieve the required Quality of Service: ${Num} Carriers</p>
    `;
});


const trafficData = [
    { N: 1, '0.1%': 0.001, '0.2%': 0.002, '0.5%': 0.005, '1%': 0.010, '1.2%': 0.012, '1.3%': 0.013, '1.5%': 0.02, '2%': 0.020, '3%': 0.031, '5%': 0.053, '7%': 0.075, '10%': 0.111, '15%': 0.176, '20%': 0.250, '30%': 0.429, '40%': 0.667, '50%': 1.00 },
    { N: 2, '0.1%': 0.046, '0.2%': 0.065, '0.5%': 0.105, '1%': 0.153, '1.2%': 0.168, '1.3%': 0.176, '1.5%': 0.19, '2%': 0.223, '3%': 0.282, '5%': 0.381, '7%': 0.470, '10%': 0.595, '15%': 0.796, '20%': 1.00, '30%': 1.45, '40%': 2.00, '50%': 2.73 },
    { N: 3, '0.1%': 0.194, '0.2%': 0.249, '0.5%': 0.349, '1%': 0.455, '1.2%': 0.489, '1.3%': 0.505, '1.5%': 0.53, '2%': 0.602, '3%': 0.715, '5%': 0.899, '7%': 1.06, '10%': 1.27, '15%': 1.60, '20%': 1.93, '30%': 2.63, '40%': 3.48, '50%': 4.59 },
    { N: 4, '0.1%': 0.439, '0.2%': 0.535, '0.5%': 0.701, '1%': 0.869, '1.2%': 0.922, '1.3%': 0.946, '1.5%': 0.99, '2%': 1.09, '3%': 1.26, '5%': 1.52, '7%': 1.75, '10%': 2.05, '15%': 2.50, '20%': 2.95, '30%': 3.89, '40%': 5.02, '50%': 6.50 },
    { N: 5, '0.1%': 0.762, '0.2%': 0.900, '0.5%': 1.13, '1%': 1.36, '1.2%': 1.43, '1.3%': 1.46, '1.5%': 1.52, '2%': 1.66, '3%': 1.88, '5%': 2.22, '7%': 2.50, '10%': 2.88, '15%': 3.45, '20%': 4.01, '30%': 5.19, '40%': 6.60, '50%': 8.44 },
    { N: 6, '0.1%': 1.15, '0.2%': 1.33, '0.5%': 1.62, '1%': 1.91, '1.2%': 2.00, '1.3%': 2.04, '1.5%': 2.11, '2%': 2.28, '3%': 2.54, '5%': 2.96, '7%': 3.30, '10%': 3.76, '15%': 4.44, '20%': 5.11, '30%': 6.51, '40%': 8.19, '50%': 10.4 },
    { N: 7, '0.1%': 1.58, '0.2%': 1.80, '0.5%': 2.16, '1%': 2.50, '1.2%': 2.60, '1.3%': 2.65, '1.5%': 2.73, '2%': 2.94, '3%': 3.25, '5%': 3.74, '7%': 4.14, '10%': 4.67, '15%': 5.46, '20%': 6.23, '30%': 7.86, '40%': 9.80, '50%': 12.4 },
    { N: 8, '0.1%': 2.05, '0.2%': 2.31, '0.5%': 2.73, '1%': 3.13, '1.2%': 3.25, '1.3%': 3.30, '1.5%': 3.40, '2%': 3.63, '3%': 3.99, '5%': 4.54, '7%': 5.00, '10%': 5.60, '15%': 6.50, '20%': 7.37, '30%': 9.21, '40%': 11.4, '50%': 14.3 },
    { N: 9, '0.1%': 2.56, '0.2%': 2.85, '0.5%': 3.33, '1%': 3.78, '1.2%': 3.92, '1.3%': 3.98, '1.5%': 4.08, '2%': 4.34, '3%': 4.75, '5%': 5.37, '7%': 5.88, '10%': 6.55, '15%': 7.55, '20%': 8.52, '30%': 10.6, '40%': 13.0, '50%': 16.3 },
    { N: 10, '0.1%': 3.09, '0.2%': 3.43, '0.5%': 3.96, '1%': 4.46, '1.2%': 4.61, '1.3%': 4.68, '1.5%': 4.80, '2%': 5.08, '3%': 5.53, '5%': 6.22, '7%': 6.78, '10%': 7.51, '15%': 8.62, '20%': 9.68, '30%': 12.0, '40%': 14.7, '50%': 18.3 },
    { N: 11, '0.1%': 3.65, '0.2%': 4.02, '0.5%': 4.61, '1%': 5.16, '1.2%': 5.32, '1.3%': 5.40, '1.5%': 5.53, '2%': 5.84, '3%': 6.33, '5%': 7.08, '7%': 7.69, '10%': 8.49, '15%': 9.69, '20%': 10.9, '30%': 13.3, '40%': 16.3, '50%': 20.3 },
    { N: 12, '0.1%': 4.23, '0.2%': 4.64, '0.5%': 5.28, '1%': 5.88, '1.2%': 6.05, '1.3%': 6.14, '1.5%': 6.27, '2%': 6.61, '3%': 7.14, '5%': 7.95, '7%': 8.61, '10%': 9.47, '15%': 10.8, '20%': 12.0, '30%': 14.7, '40%': 18.0, '50%': 22.2 },
    { N: 13, '0.1%': 4.83, '0.2%': 5.27, '0.5%': 5.96, '1%': 6.61, '1.2%': 6.80, '1.3%': 6.89, '1.5%': 7.03, '2%': 7.40, '3%': 7.97, '5%': 8.83, '7%': 9.54, '10%': 10.5, '15%': 11.9, '20%': 13.2, '30%': 16.1, '40%': 19.6, '50%': 24.2 },
    { N: 14, '0.1%': 5.45, '0.2%': 5.92, '0.5%': 6.66, '1%': 7.35, '1.2%': 7.56, '1.3%': 7.65, '1.5%': 7.81, '2%': 8.20, '3%': 8.80, '5%': 9.73, '7%': 10.5, '10%': 11.5, '15%': 13.0, '20%': 14.4, '30%': 17.5, '40%': 21.2, '50%': 26.2 },
    { N: 15, '0.1%': 6.08, '0.2%': 6.58, '0.5%': 7.38, '1%': 8.11, '1.2%': 8.33, '1.3%': 8.43, '1.5%': 8.59, '2%': 9.01, '3%': 9.65, '5%': 10.6, '7%': 11.4, '10%': 12.5, '15%': 14.1, '20%': 15.6, '30%': 18.9, '40%': 22.9, '50%': 28.2 },
    { N: 16, '0.1%': 6.72, '0.2%': 7.26, '0.5%': 8.10, '1%': 8.88, '1.2%': 9.11, '1.3%': 9.21, '1.5%': 9.39, '2%': 9.83, '3%': 10.5, '5%': 11.5, '7%': 12.4, '10%': 13.5, '15%': 15.2, '20%': 16.8, '30%': 20.3, '40%': 24.5, '50%': 30.2 },
    { N: 17, '0.1%': 7.38, '0.2%': 7.95, '0.5%': 8.83, '1%': 9.65, '1.2%': 9.89, '1.3%': 10.0, '1.5%': 10.19, '2%': 10.7, '3%': 11.4, '5%': 12.5, '7%': 13.4, '10%': 14.5, '15%': 16.3, '20%': 18.0, '30%': 21.7, '40%': 26.2, '50%': 32.2 },
    { N: 18, '0.1%': 8.05, '0.2%': 8.64, '0.5%': 9.58, '1%': 10.4, '1.2%': 10.7, '1.3%': 10.8, '1.5%': 11.00, '2%': 11.5, '3%': 12.2, '5%': 13.4, '7%': 14.3, '10%': 15.5, '15%': 17.4, '20%': 19.2, '30%': 23.1, '40%': 27.8, '50%': 34.2 },
    { N: 19, '0.1%': 8.72, '0.2%': 9.35, '0.5%': 10.3, '1%': 11.2, '1.2%': 11.5, '1.3%': 11.6, '1.5%': 11.82, '2%': 12.3, '3%': 13.1, '5%': 14.3, '7%': 15.3, '10%': 16.6, '15%': 18.5, '20%': 20.4, '30%': 24.5, '40%': 29.5, '50%': 36.2 },
    { N: 20, '0.1%': 9.41, '0.2%': 10.1, '0.5%': 11.1, '1%': 12.0, '1.2%': 12.3, '1.3%': 12.4, '1.5%': 12.65, '2%': 13.2, '3%': 14.0, '5%': 15.2, '7%': 16.3, '10%': 17.6, '15%': 19.6, '20%': 21.6, '30%': 25.9, '40%': 31.2, '50%': 38.2 },
    { N: 21, '0.1%': 10.1, '0.2%': 10.8, '0.5%': 11.9, '1%': 12.8, '1.2%': 13.1, '1.3%': 13.3, '1.5%': 13.48, '2%': 14.0, '3%': 14.9, '5%': 16.2, '7%': 17.3, '10%': 18.7, '15%': 20.8, '20%': 22.8, '30%': 27.3, '40%': 32.8, '50%': 40.2 },
    { N: 22, '0.1%': 10.8, '0.2%': 11.5, '0.5%': 12.6, '1%': 13.7, '1.2%': 14.0, '1.3%': 14.1, '1.5%': 14.32, '2%': 14.9, '3%': 15.8, '5%': 17.1, '7%': 18.2, '10%': 19.7, '15%': 21.9, '20%': 24.1, '30%': 28.7, '40%': 34.5, '50%': 42.1 },
    { N: 23, '0.1%': 11.5, '0.2%': 12.3, '0.5%': 13.4, '1%': 14.5, '1.2%': 14.8, '1.3%': 14.9, '1.5%': 15.16, '2%': 15.8, '3%': 16.7, '5%': 18.1, '7%': 19.2, '10%': 20.7, '15%': 23.0, '20%': 25.3, '30%': 30.1, '40%': 36.1, '50%': 44.1 },
    { N: 24, '0.1%': 12.2, '0.2%': 13.0, '0.5%': 14.2, '1%': 15.3, '1.2%': 15.6, '1.3%': 15.8, '1.5%': 16.01, '2%': 16.6, '3%': 17.6, '5%': 19.0, '7%': 20.2, '10%': 21.8, '15%': 24.2, '20%': 26.5, '30%': 31.6, '40%': 37.8, '50%': 46.1 },
    { N: 25, '0.1%': 13.0, '0.2%': 13.8, '0.5%': 15.0, '1%': 16.1, '1.2%': 16.5, '1.3%': 16.6, '1.5%': 16.87, '2%': 17.5, '3%': 18.5, '5%': 20.0, '7%': 21.2, '10%': 22.8, '15%': 25.3, '20%': 27.7, '30%': 33.0, '40%': 39.4, '50%': 48.1 },
    { N: 26, '0.1%': 13.7, '0.2%': 14.5, '0.5%': 15.8, '1%': 17.0, '1.2%': 17.3, '1.3%': 17.5, '1.5%': 17.72, '2%': 18.4, '3%': 19.4, '5%': 20.9, '7%': 22.2, '10%': 23.9, '15%': 26.4, '20%': 28.9, '30%': 34.4, '40%': 41.1, '50%': 50.1 },
    { N: 27, '0.1%': 14.4, '0.2%': 15.3, '0.5%': 16.6, '1%': 17.8, '1.2%': 18.2, '1.3%': 18.3, '1.5%': 18.59, '2%': 19.3, '3%': 20.3, '5%': 21.9, '7%': 23.2, '10%': 24.9, '15%': 27.6, '20%': 30.2, '30%': 35.8, '40%': 42.8, '50%': 52.1 },
    { N: 28, '0.1%': 15.2, '0.2%': 16.1, '0.5%': 17.4, '1%': 18.6, '1.2%': 19.0, '1.3%': 19.2, '1.5%': 19.45, '2%': 20.2, '3%': 21.2, '5%': 22.9, '7%': 24.2, '10%': 26.0, '15%': 28.7, '20%': 31.4, '30%': 37.2, '40%': 44.4, '50%': 54.1 },
    { N: 29, '0.1%': 15.9, '0.2%': 16.8, '0.5%': 18.2, '1%': 19.5, '1.2%': 19.9, '1.3%': 20.0, '1.5%': 20.32, '2%': 21.0, '3%': 22.1, '5%': 23.8, '7%': 25.2, '10%': 27.1, '15%': 29.9, '20%': 32.6, '30%': 38.6, '40%': 46.1, '50%': 56.1 },
    { N: 30, '0.1%': 16.7, '0.2%': 17.6, '0.5%': 19.0, '1%': 20.3, '1.2%': 20.7, '1.3%': 20.9, '1.5%': 21.19, '2%': 21.9, '3%': 23.1, '5%': 24.8, '7%': 26.2, '10%': 28.1, '15%': 31.0, '20%': 33.8, '30%': 40.0, '40%': 47.7, '50%': 58.1 },
    { N: 31, '0.1%': 17.4, '0.2%': 18.4, '0.5%': 19.9, '1%': 21.2, '1.2%': 21.6, '1.3%': 21.8, '1.5%': 22.07, '2%': 22.8, '3%': 24.0, '5%': 25.8, '7%': 27.2, '10%': 29.2, '15%': 32.1, '20%': 35.1, '30%': 41.5, '40%': 49.4, '50%': 60.1 },
    { N: 32, '0.1%': 18.2, '0.2%': 19.2, '0.5%': 20.7, '1%': 22.0, '1.2%': 22.5, '1.3%': 22.6, '1.5%': 22.95, '2%': 23.7, '3%': 24.9, '5%': 26.7, '7%': 28.2, '10%': 30.2, '15%': 33.3, '20%': 36.3, '30%': 42.9, '40%': 51.1, '50%': 62.1 },
    { N: 33, '0.1%': 19.0, '0.2%': 20.0, '0.5%': 21.5, '1%': 22.9, '1.2%': 23.3, '1.3%': 23.5, '1.5%': 23.83, '2%': 24.6, '3%': 25.8, '5%': 27.7, '7%': 29.3, '10%': 31.3, '15%': 34.4, '20%': 37.5, '30%': 44.3, '40%': 52.7, '50%': 64.1 },
    { N: 34, '0.1%': 19.7, '0.2%': 20.8, '0.5%': 22.3, '1%': 23.8, '1.2%': 24.2, '1.3%': 24.4, '1.5%': 24.72, '2%': 25.5, '3%': 26.8, '5%': 28.7, '7%': 30.3, '10%': 32.4, '15%': 35.6, '20%': 38.8, '30%': 45.7, '40%': 54.4, '50%': 66.1 },
    { N: 35, '0.1%': 20.5, '0.2%': 21.6, '0.5%': 23.2, '1%': 24.6, '1.2%': 25.1, '1.3%': 25.3, '1.5%': 25.60, '2%': 26.4, '3%': 27.7, '5%': 29.7, '7%': 31.3, '10%': 33.4, '15%': 36.7, '20%': 40.0, '30%': 47.1, '40%': 56.0, '50%': 68.1 },
    { N: 36, '0.1%': 21.3, '0.2%': 22.4, '0.5%': 24.0, '1%': 25.5, '1.2%': 26.0, '1.3%': 26.2, '1.5%': 26.49, '2%': 27.3, '3%': 28.6, '5%': 30.7, '7%': 32.3, '10%': 34.5, '15%': 37.9, '20%': 41.2, '30%': 48.6, '40%': 57.7, '50%': 70.1 },
    { N: 37, '0.1%': 22.1, '0.2%': 23.2, '0.5%': 24.8, '1%': 26.4, '1.2%': 26.8, '1.3%': 27.0, '1.5%': 27.39, '2%': 28.3, '3%': 29.6, '5%': 31.6, '7%': 33.3, '10%': 35.6, '15%': 39.0, '20%': 42.4, '30%': 50.0, '40%': 59.4, '50%': 72.1 },
    { N: 38, '0.1%': 22.9, '0.2%': 24.0, '0.5%': 25.7, '1%': 27.3, '1.2%': 27.7, '1.3%': 27.9, '1.5%': 28.28, '2%': 29.2, '3%': 30.5, '5%': 32.6, '7%': 34.4, '10%': 36.6, '15%': 40.2, '20%': 43.7, '30%': 51.4, '40%': 61.0, '50%': 74.1 },
    { N: 39, '0.1%': 23.7, '0.2%': 24.8, '0.5%': 26.5, '1%': 28.1, '1.2%': 28.6, '1.3%': 28.8, '1.5%': 29.18, '2%': 30.1, '3%': 31.5, '5%': 33.6, '7%': 35.4, '10%': 37.7, '15%': 41.3, '20%': 44.9, '30%': 52.8, '40%': 62.7, '50%': 76.1 },
    { N: 40, '0.1%': 24.4, '0.2%': 25.6, '0.5%': 27.4, '1%': 29.0, '1.2%': 29.5, '1.3%': 29.7, '1.5%': 30.08, '2%': 31.0, '3%': 32.4, '5%': 34.6, '7%': 36.4, '10%': 38.8, '15%': 42.5, '20%': 46.1, '30%': 54.2, '40%': 64.4, '50%': 78.1 },
    { N: 41, '0.1%': 25.2, '0.2%': 26.4, '0.5%': 28.2, '1%': 29.9, '1.2%': 30.4, '1.3%': 30.6, '1.5%': 30.98, '2%': 31.9, '3%': 33.4, '5%': 35.6, '7%': 37.4, '10%': 39.9, '15%': 43.6, '20%': 47.4, '30%': 55.7, '40%': 66.0, '50%': 80.1 },
    { N: 42, '0.1%': 26.0, '0.2%': 27.2, '0.5%': 29.1, '1%': 30.8, '1.2%': 31.3, '1.3%': 31.5, '1.5%': 31.88, '2%': 32.8, '3%': 34.3, '5%': 36.6, '7%': 38.4, '10%': 40.9, '15%': 44.8, '20%': 48.6, '30%': 57.1, '40%': 67.7, '50%': 82.1 },
    { N: 43, '0.1%': 26.8, '0.2%': 28.1, '0.5%': 29.9, '1%': 31.7, '1.2%': 32.2, '1.3%': 32.4, '1.5%': 32.79, '2%': 33.8, '3%': 35.3, '5%': 37.6, '7%': 39.5, '10%': 42.0, '15%': 45.9, '20%': 49.9, '30%': 58.5, '40%': 69.3, '50%': 84.1 },
    { N: 44, '0.1%': 27.6, '0.2%': 28.9, '0.5%': 30.8, '1%': 32.5, '1.2%': 33.1, '1.3%': 33.3, '1.5%': 33.69, '2%': 34.7, '3%': 36.2, '5%': 38.6, '7%': 40.5, '10%': 43.1, '15%': 47.1, '20%': 51.1, '30%': 59.9, '40%': 71.0, '50%': 86.1 },
    { N: 45, '0.1%': 28.4, '0.2%': 29.7, '0.5%': 31.7, '1%': 33.4, '1.2%': 34.0, '1.3%': 34.2, '1.5%': 34.60, '2%': 35.6, '3%': 37.2, '5%': 39.6, '7%': 41.5, '10%': 44.2, '15%': 48.2, '20%': 52.3, '30%': 61.3, '40%': 72.7, '50%': 88.1 },
    { N: 46, '0.1%': 29.3, '0.2%': 30.5, '0.5%': 32.5, '1%': 34.3, '1.2%': 34.9, '1.3%': 35.1, '1.5%': 35.51, '2%': 36.5, '3%': 38.1, '5%': 40.5, '7%': 42.6, '10%': 45.2, '15%': 49.4, '20%': 53.6, '30%': 62.8, '40%': 74.3, '50%': 90.1 },
    { N: 47, '0.1%': 30.1, '0.2%': 31.4, '0.5%': 33.4, '1%': 35.2, '1.2%': 35.8, '1.3%': 36.0, '1.5%': 36.42, '2%': 37.5, '3%': 39.1, '5%': 41.5, '7%': 43.6, '10%': 46.3, '15%': 50.6, '20%': 54.8, '30%': 64.2, '40%': 76.0, '50%': 92.1 },
    { N: 48, '0.1%': 30.9, '0.2%': 32.2, '0.5%': 34.2, '1%': 36.1, '1.2%': 36.7, '1.3%': 36.9, '1.5%': 37.34, '2%': 38.4, '3%': 40.0, '5%': 42.5, '7%': 44.6, '10%': 47.4, '15%': 51.7, '20%': 56.0, '30%': 65.6, '40%': 77.7, '50%': 94.1 },
    { N: 49, '0.1%': 31.7, '0.2%': 33.0, '0.5%': 35.1, '1%': 37.0, '1.2%': 37.6, '1.3%': 37.8, '1.5%': 38.25, '2%': 39.3, '3%': 41.0, '5%': 43.5, '7%': 45.7, '10%': 48.5, '15%': 52.9, '20%': 57.3, '30%': 67.0, '40%': 79.3, '50%': 96.1 },
    { N: 50, '0.1%': 32.5, '0.2%': 33.9, '0.5%': 36.0, '1%': 37.9, '1.2%': 38.5, '1.3%': 38.7, '1.5%': 39.17, '2%': 40.3, '3%': 41.9, '5%': 44.5, '7%': 46.7, '10%': 49.6, '15%': 54.0, '20%': 58.5, '30%': 68.5, '40%': 81.0, '50%': 98.1 },
    { N: 51, '0.1%': 33.3, '0.2%': 34.7, '0.5%': 36.9, '1%': 38.8, '1.2%': 39.4, '1.3%': 39.6, '1.5%': 40.08, '2%': 41.2, '3%': 42.9, '5%': 45.5, '7%': 47.7, '10%': 50.6, '15%': 55.2, '20%': 59.7, '30%': 69.9, '40%': 82.7, '50%': 100.1 },
    { N: 52, '0.1%': 34.2, '0.2%': 35.6, '0.5%': 37.7, '1%': 39.7, '1.2%': 40.3, '1.3%': 40.6, '1.5%': 41.00, '2%': 42.1, '3%': 43.9, '5%': 46.5, '7%': 48.8, '10%': 51.7, '15%': 56.3, '20%': 61.0, '30%': 71.3, '40%': 84.3, '50%': 102.1 },
    { N: 53, '0.1%': 35.0, '0.2%': 36.4, '0.5%': 38.6, '1%': 40.6, '1.2%': 41.2, '1.3%': 41.5, '1.5%': 41.92, '2%': 43.1, '3%': 44.8, '5%': 47.5, '7%': 49.8, '10%': 52.8, '15%': 57.5, '20%': 62.2, '30%': 72.7, '40%': 86.0, '50%': 104.1 },
    { N: 54, '0.1%': 35.8, '0.2%': 37.2, '0.5%': 39.5, '1%': 41.5, '1.2%': 42.1, '1.3%': 42.4, '1.5%': 42.84, '2%': 44.0, '3%': 45.8, '5%': 48.5, '7%': 50.8, '10%': 53.9, '15%': 58.7, '20%': 63.5, '30%': 74.2, '40%': 87.6, '50%': 106.1 },
    { N: 55, '0.1%': 36.6, '0.2%': 38.1, '0.5%': 40.4, '1%': 42.4, '1.2%': 43.0, '1.3%': 43.3, '1.5%': 43.77, '2%': 44.9, '3%': 46.7, '5%': 49.5, '7%': 51.9, '10%': 55.0, '15%': 59.8, '20%': 64.7, '30%': 75.6, '40%': 89.3, '50%': 108.1 },
    { N: 56, '0.1%': 37.5, '0.2%': 38.9, '0.5%': 41.2, '1%': 43.3, '1.2%': 43.9, '1.3%': 44.2, '1.5%': 44.69, '2%': 45.9, '3%': 47.7, '5%': 50.5, '7%': 52.9, '10%': 56.1, '15%': 61.0, '20%': 65.9, '30%': 77.0, '40%': 91.0, '50%': 110.1 },
    { N: 57, '0.1%': 38.3, '0.2%': 39.8, '0.5%': 42.1, '1%': 44.2, '1.2%': 44.8, '1.3%': 45.1, '1.5%': 45.62, '2%': 46.8, '3%': 48.7, '5%': 51.5, '7%': 53.9, '10%': 57.1, '15%': 62.1, '20%': 67.2, '30%': 78.4, '40%': 92.6, '50%': 112.1 },
    { N: 58, '0.1%': 39.1, '0.2%': 40.6, '0.5%': 43.0, '1%': 45.1, '1.2%': 45.8, '1.3%': 46.1, '1.5%': 46.54, '2%': 47.8, '3%': 49.6, '5%': 52.6, '7%': 55.0, '10%': 58.2, '15%': 63.3, '20%': 68.4, '30%': 79.8, '40%': 94.3, '50%': 114.1 },
    { N: 59, '0.1%': 40.0, '0.2%': 41.5, '0.5%': 43.9, '1%': 46.0, '1.2%': 46.7, '1.3%': 47.0, '1.5%': 47.47, '2%': 48.7, '3%': 50.6, '5%': 53.6, '7%': 56.0, '10%': 59.3, '15%': 64.5, '20%': 69.7, '30%': 81.3, '40%': 96.0, '50%': 116.1 },
    { N: 60, '0.1%': 40.8, '0.2%': 42.4, '0.5%': 44.8, '1%': 46.9, '1.2%': 47.6, '1.3%': 47.9, '1.5%': 48.40, '2%': 49.6, '3%': 51.6, '5%': 54.6, '7%': 57.1, '10%': 60.4, '15%': 65.6, '20%': 70.9, '30%': 82.7, '40%': 97.6, '50%': 118.1 },
    { N: 61, '0.1%': 41.6, '0.2%': 43.2, '0.5%': 45.6, '1%': 47.9, '1.2%': 48.5, '1.3%': 48.8, '1.5%': 49.33, '2%': 50.6, '3%': 52.5, '5%': 55.6, '7%': 58.1, '10%': 61.5, '15%': 66.8, '20%': 72.1, '30%': 84.1, '40%': 99.3, '50%': 120.1 },
    { N: 62, '0.1%': 42.5, '0.2%': 44.1, '0.5%': 46.5, '1%': 48.8, '1.2%': 49.4, '1.3%': 49.7, '1.5%': 50.26, '2%': 51.5, '3%': 53.5, '5%': 56.6, '7%': 59.1, '10%': 62.6, '15%': 68.0, '20%': 73.4, '30%': 85.5, '40%': 101.0, '50%': 122.1 },
    { N: 63, '0.1%': 43.3, '0.2%': 44.9, '0.5%': 47.4, '1%': 49.7, '1.2%': 50.4, '1.3%': 50.7, '1.5%': 51.19, '2%': 52.5, '3%': 54.5, '5%': 57.5, '7%': 60.2, '10%': 63.7, '15%': 69.1, '20%': 74.6, '30%': 87.0, '40%': 102.6, '50%': 124.1 },
    { N: 64, '0.1%': 44.2, '0.2%': 45.8, '0.5%': 48.3, '1%': 50.6, '1.2%': 51.3, '1.3%': 51.6, '1.5%': 52.12, '2%': 53.4, '3%': 55.4, '5%': 58.6, '7%': 61.2, '10%': 64.8, '15%': 70.3, '20%': 75.9, '30%': 88.4, '40%': 104.3, '50%': 126.1 },
    { N: 65, '0.1%': 45.0, '0.2%': 46.6, '0.5%': 49.2, '1%': 51.5, '1.2%': 52.2, '1.3%': 52.5, '1.5%': 53.05, '2%': 54.4, '3%': 56.4, '5%': 59.6, '7%': 62.3, '10%': 65.8, '15%': 71.4, '20%': 77.1, '30%': 89.8, '40%': 106.0, '50%': 128.1 },
    { N: 66, '0.1%': 45.8, '0.2%': 47.5, '0.5%': 50.1, '1%': 52.4, '1.2%': 53.1, '1.3%': 53.5, '1.5%': 53.99, '2%': 55.3, '3%': 57.4, '5%': 60.6, '7%': 63.3, '10%': 66.9, '15%': 72.6, '20%': 78.3, '30%': 91.2, '40%': 107.6, '50%': 130.1 },
    { N: 67, '0.1%': 46.7, '0.2%': 48.4, '0.5%': 51.0, '1%': 53.4, '1.2%': 54.1, '1.3%': 54.4, '1.5%': 54.92, '2%': 56.3, '3%': 58.4, '5%': 61.6, '7%': 64.4, '10%': 68.0, '15%': 73.8, '20%': 79.6, '30%': 92.7, '40%': 109.3, '50%': 132.1 },
    { N: 68, '0.1%': 47.5, '0.2%': 49.2, '0.5%': 51.9, '1%': 54.3, '1.2%': 55.0, '1.3%': 55.3, '1.5%': 55.86, '2%': 57.2, '3%': 59.3, '5%': 62.6, '7%': 65.4, '10%': 69.1, '15%': 74.9, '20%': 80.8, '30%': 94.1, '40%': 111.0, '50%': 134.1 },
    { N: 69, '0.1%': 48.4, '0.2%': 50.1, '0.5%': 52.8, '1%': 55.2, '1.2%': 55.9, '1.3%': 56.2, '1.5%': 56.79, '2%': 58.2, '3%': 60.3, '5%': 63.7, '7%': 66.4, '10%': 70.2, '15%': 76.1, '20%': 82.1, '30%': 95.5, '40%': 112.6, '50%': 136.1 },
    { N: 70, '0.1%': 49.2, '0.2%': 51.0, '0.5%': 53.7, '1%': 56.1, '1.2%': 56.8, '1.3%': 57.2, '1.5%': 57.73, '2%': 59.1, '3%': 61.3, '5%': 64.7, '7%': 67.5, '10%': 71.3, '15%': 77.3, '20%': 83.3, '30%': 96.9, '40%': 114.3, '50%': 138.1 },
    { N: 71, '0.1%': 50.1, '0.2%': 51.8, '0.5%': 54.6, '1%': 57.0, '1.2%': 57.8, '1.3%': 58.1, '1.5%': 58.67, '2%': 60.1, '3%': 62.3, '5%': 65.7, '7%': 68.5, '10%': 72.4, '15%': 78.4, '20%': 84.6, '30%': 98.4, '40%': 115.9, '50%': 140.1 },
    { N: 72, '0.1%': 50.9, '0.2%': 52.7, '0.5%': 55.5, '1%': 58.0, '1.2%': 58.7, '1.3%': 59.0, '1.5%': 59.61, '2%': 61.0, '3%': 63.2, '5%': 66.7, '7%': 69.6, '10%': 73.5, '15%': 79.6, '20%': 85.8, '30%': 99.8, '40%': 117.6, '50%': 142.1 },
    { N: 73, '0.1%': 51.8, '0.2%': 53.6, '0.5%': 56.4, '1%': 58.9, '1.2%': 59.6, '1.3%': 60.0, '1.5%': 60.55, '2%': 62.0, '3%': 64.2, '5%': 67.7, '7%': 70.6, '10%': 74.6, '15%': 80.8, '20%': 87.0, '30%': 101.2, '40%': 119.3, '50%': 144.1 },
    { N: 74, '0.1%': 52.7, '0.2%': 54.5, '0.5%': 57.3, '1%': 59.8, '1.2%': 60.6, '1.3%': 60.9, '1.5%': 61.49, '2%': 62.9, '3%': 65.2, '5%': 68.7, '7%': 71.7, '10%': 75.6, '15%': 81.9, '20%': 88.3, '30%': 102.7, '40%': 120.9, '50%': 146.1 },
    { N: 75, '0.1%': 53.5, '0.2%': 55.3, '0.5%': 58.2, '1%': 60.7, '1.2%': 61.5, '1.3%': 61.8, '1.5%': 62.43, '2%': 63.9, '3%': 66.2, '5%': 69.7, '7%': 72.7, '10%': 76.7, '15%': 83.1, '20%': 89.5, '30%': 104.1, '40%': 122.6, '50%': 148.0 },
    { N: 76, '0.1%': 54.4, '0.2%': 56.2, '0.5%': 59.1, '1%': 61.7, '1.2%': 62.4, '1.3%': 62.8, '1.5%': 63.37, '2%': 64.9, '3%': 67.2, '5%': 70.8, '7%': 73.8, '10%': 77.8, '15%': 84.2, '20%': 90.8, '30%': 105.5, '40%': 124.3, '50%': 150.0 },
    { N: 77, '0.1%': 55.2, '0.2%': 57.1, '0.5%': 60.0, '1%': 62.6, '1.2%': 63.4, '1.3%': 63.7, '1.5%': 64.32, '2%': 65.8, '3%': 68.1, '5%': 71.8, '7%': 74.8, '10%': 78.9, '15%': 85.4, '20%': 92.0, '30%': 106.9, '40%': 125.9, '50%': 152.0 },
    { N: 78, '0.1%': 56.1, '0.2%': 58.0, '0.5%': 60.9, '1%': 63.5, '1.2%': 64.3, '1.3%': 64.7, '1.5%': 65.26, '2%': 66.8, '3%': 69.1, '5%': 72.8, '7%': 75.9, '10%': 80.0, '15%': 86.6, '20%': 93.3, '30%': 108.4, '40%': 127.6, '50%': 154.0 },
    { N: 79, '0.1%': 56.9, '0.2%': 58.8, '0.5%': 61.8, '1%': 64.4, '1.2%': 65.2, '1.3%': 65.6, '1.5%': 66.20, '2%': 67.7, '3%': 70.1, '5%': 73.8, '7%': 76.9, '10%': 81.1, '15%': 87.7, '20%': 94.5, '30%': 109.8, '40%': 129.3, '50%': 156.0 },
    { N: 80, '0.1%': 57.8, '0.2%': 59.7, '0.5%': 62.7, '1%': 65.4, '1.2%': 66.2, '1.3%': 66.5, '1.5%': 67.15, '2%': 68.7, '3%': 71.1, '5%': 74.8, '7%': 78.0, '10%': 82.2, '15%': 88.9, '20%': 95.7, '30%': 111.2, '40%': 130.9, '50%': 158.0 },
    { N: 81, '0.1%': 58.7, '0.2%': 60.6, '0.5%': 63.6, '1%': 66.3, '1.2%': 67.1, '1.3%': 67.5, '1.5%': 68.09, '2%': 69.6, '3%': 72.1, '5%': 75.8, '7%': 79.0, '10%': 83.3, '15%': 90.1, '20%': 97.0, '30%': 112.6, '40%': 132.6, '50%': 160.0 },
    { N: 82, '0.1%': 59.5, '0.2%': 61.5, '0.5%': 64.5, '1%': 67.2, '1.2%': 68.0, '1.3%': 68.4, '1.5%': 69.04, '2%': 70.6, '3%': 73.0, '5%': 76.9, '7%': 80.1, '10%': 84.4, '15%': 91.2, '20%': 98.2, '30%': 114.1, '40%': 134.3, '50%': 162.0 },
    { N: 83, '0.1%': 60.4, '0.2%': 62.4, '0.5%': 65.4, '1%': 68.2, '1.2%': 69.0, '1.3%': 69.4, '1.5%': 69.99, '2%': 71.6, '3%': 74.0, '5%': 77.9, '7%': 81.1, '10%': 85.5, '15%': 92.4, '20%': 99.5, '30%': 115.5, '40%': 135.9, '50%': 164.0 },
    { N: 84, '0.1%': 61.3, '0.2%': 63.2, '0.5%': 66.3, '1%': 69.1, '1.2%': 69.9, '1.3%': 70.3, '1.5%': 70.93, '2%': 72.5, '3%': 75.0, '5%': 78.9, '7%': 82.2, '10%': 86.6, '15%': 93.6, '20%': 100.7, '30%': 116.9, '40%': 137.6, '50%': 166.0 },
    { N: 85, '0.1%': 62.1, '0.2%': 64.1, '0.5%': 67.2, '1%': 70.0, '1.2%': 70.9, '1.3%': 71.2, '1.5%': 71.88, '2%': 73.5, '3%': 76.0, '5%': 79.9, '7%': 83.2, '10%': 87.7, '15%': 94.7, '20%': 102.0, '30%': 118.3, '40%': 139.3, '50%': 168.0 },
    { N: 86, '0.1%': 63.0, '0.2%': 65.0, '0.5%': 68.1, '1%': 70.9, '1.2%': 71.8, '1.3%': 72.2, '1.5%': 72.83, '2%': 74.5, '3%': 77.0, '5%': 80.9, '7%': 84.3, '10%': 88.8, '15%': 95.9, '20%': 103.2, '30%': 119.8, '40%': 140.9, '50%': 170.0 },
    { N: 87, '0.1%': 63.9, '0.2%': 65.9, '0.5%': 69.0, '1%': 71.9, '1.2%': 72.7, '1.3%': 73.1, '1.5%': 73.78, '2%': 75.4, '3%': 78.0, '5%': 82.0, '7%': 85.3, '10%': 89.9, '15%': 97.1, '20%': 104.5, '30%': 121.2, '40%': 142.6, '50%': 172.0 },
    { N: 88, '0.1%': 64.7, '0.2%': 66.8, '0.5%': 69.9, '1%': 72.8, '1.2%': 73.7, '1.3%': 74.1, '1.5%': 74.73, '2%': 76.4, '3%': 78.9, '5%': 83.0, '7%': 86.4, '10%': 91.0, '15%': 98.2, '20%': 105.7, '30%': 122.6, '40%': 144.3, '50%': 174.0 },
    { N: 89, '0.1%': 65.6, '0.2%': 67.7, '0.5%': 70.8, '1%': 73.7, '1.2%': 74.6, '1.3%': 75.0, '1.5%': 75.68, '2%': 77.3, '3%': 79.9, '5%': 84.0, '7%': 87.4, '10%': 92.1, '15%': 99.4, '20%': 106.9, '30%': 124.0, '40%': 145.9, '50%': 176.0 },
    { N: 90, '0.1%': 66.5, '0.2%': 68.6, '0.5%': 71.8, '1%': 74.7, '1.2%': 75.6, '1.3%': 76.0, '1.5%': 76.63, '2%': 78.3, '3%': 80.9, '5%': 85.0, '7%': 88.5, '10%': 93.1, '15%': 100.6, '20%': 108.2, '30%': 125.5, '40%': 147.6, '50%': 178.0 },
    { N: 91, '0.1%': 67.4, '0.2%': 69.4, '0.5%': 72.7, '1%': 75.6, '1.2%': 76.5, '1.3%': 76.9, '1.5%': 77.58, '2%': 79.3, '3%': 81.9, '5%': 86.0, '7%': 89.5, '10%': 94.2, '15%': 101.7, '20%': 109.4, '30%': 126.9, '40%': 149.3, '50%': 180.0 },
    { N: 92, '0.1%': 68.2, '0.2%': 70.3, '0.5%': 73.6, '1%': 76.6, '1.2%': 77.4, '1.3%': 77.8, '1.5%': 78.53, '2%': 80.2, '3%': 82.9, '5%': 87.1, '7%': 90.6, '10%': 95.3, '15%': 102.9, '20%': 110.7, '30%': 128.3, '40%': 150.9, '50%': 182.0 },
    { N: 93, '0.1%': 69.1, '0.2%': 71.2, '0.5%': 74.5, '1%': 77.5, '1.2%': 78.4, '1.3%': 78.8, '1.5%': 79.48, '2%': 81.2, '3%': 83.9, '5%': 88.1, '7%': 91.6, '10%': 96.4, '15%': 104.1, '20%': 111.9, '30%': 129.7, '40%': 152.6, '50%': 184.0 },
    { N: 94, '0.1%': 70.0, '0.2%': 72.1, '0.5%': 75.4, '1%': 78.4, '1.2%': 79.3, '1.3%': 79.7, '1.5%': 80.43, '2%': 82.2, '3%': 84.9, '5%': 89.1, '7%': 92.7, '10%': 97.5, '15%': 105.3, '20%': 113.2, '30%': 131.2, '40%': 154.3, '50%': 186.0 },
    { N: 95, '0.1%': 70.9, '0.2%': 73.0, '0.5%': 76.3, '1%': 79.4, '1.2%': 80.3, '1.3%': 80.7, '1.5%': 81.39, '2%': 83.1, '3%': 85.8, '5%': 90.1, '7%': 93.7, '10%': 98.6, '15%': 106.4, '20%': 114.4, '30%': 132.6, '40%': 155.9, '50%': 188.0 },
    { N: 96, '0.1%': 71.7, '0.2%': 73.9, '0.5%': 77.2, '1%': 80.3, '1.2%': 81.2, '1.3%': 81.6, '1.5%': 82.34, '2%': 84.1, '3%': 86.8, '5%': 91.1, '7%': 94.8, '10%': 99.7, '15%': 107.6, '20%': 115.7, '30%': 134.0, '40%': 157.6, '50%': 190.0 },
    { N: 97, '0.1%': 72.6, '0.2%': 74.8, '0.5%': 78.2, '1%': 81.2, '1.2%': 82.2, '1.3%': 82.6, '1.5%': 83.29, '2%': 85.1, '3%': 87.8, '5%': 92.2, '7%': 95.8, '10%': 100.8, '15%': 108.8, '20%': 116.9, '30%': 135.5, '40%': 159.3, '50%': 192.0 },
    { N: 98, '0.1%': 73.5, '0.2%': 75.7, '0.5%': 79.1, '1%': 82.2, '1.2%': 83.1, '1.3%': 83.5, '1.5%': 84.25, '2%': 86.0, '3%': 88.8, '5%': 93.2, '7%': 96.9, '10%': 101.9, '15%': 109.9, '20%': 118.2, '30%': 136.9, '40%': 160.9, '50%': 194.0 },
    { N: 99, '0.1%': 74.4, '0.2%': 76.6, '0.5%': 80.0, '1%': 83.1, '1.2%': 84.1, '1.3%': 84.5, '1.5%': 85.20, '2%': 87.0, '3%': 89.8, '5%': 94.2, '7%': 97.9, '10%': 103.0, '15%': 111.1, '20%': 119.4, '30%': 138.3, '40%': 162.6, '50%': 196.0 },
    { N: 100, '0.1%': 75.2, '0.2%': 77.5, '0.5%': 80.9, '1%': 84.1, '1.2%': 85.0, '1.3%': 85.4, '1.5%': 86.16, '2%': 88.0, '3%': 90.8, '5%': 95.2, '7%': 99.0, '10%': 104.1, '15%': 112.3, '20%': 120.6, '30%': 139.7, '40%': 164.3, '50%': 198.0 },
    { N: 101, '0.1%': 76.1, '0.2%': 78.4, '0.5%': 81.8, '1%': 85.0, '1.2%': 86.0, '1.3%': 86.4, '1.5%': 87.12, '2%': 88.9, '3%': 91.8, '5%': 96.3, '7%': 100.0, '10%': 105.2, '15%': 113.4, '20%': 121.9, '30%': 141.2, '40%': 165.9, '50%': 200.0 },
    { N: 102, '0.1%': 77.0, '0.2%': 79.3, '0.5%': 82.7, '1%': 85.9, '1.2%': 86.9, '1.3%': 87.3, '1.5%': 88.07, '2%': 89.9, '3%': 92.8, '5%': 97.3, '7%': 101.1, '10%': 106.3, '15%': 114.6, '20%': 123.1, '30%': 142.6, '40%': 167.6, '50%': 202.0 },
    { N: 103, '0.1%': 77.9, '0.2%': 80.2, '0.5%': 83.7, '1%': 86.9, '1.2%': 87.8, '1.3%': 88.3, '1.5%': 89.03, '2%': 90.9, '3%': 93.8, '5%': 98.3, '7%': 102.2, '10%': 107.4, '15%': 115.8, '20%': 124.4, '30%': 144.0, '40%': 169.2, '50%': 204.0 },
    { N: 104, '0.1%': 78.8, '0.2%': 81.1, '0.5%': 84.6, '1%': 87.8, '1.2%': 88.8, '1.3%': 89.2, '1.5%': 89.99, '2%': 91.9, '3%': 94.8, '5%': 99.3, '7%': 103.2, '10%': 108.5, '15%': 116.9, '20%': 125.6, '30%': 145.4, '40%': 170.9, '50%': 206.0 },
    { N: 105, '0.1%': 79.6, '0.2%': 82.0, '0.5%': 85.5, '1%': 88.8, '1.2%': 89.7, '1.3%': 90.2, '1.5%': 90.94, '2%': 92.8, '3%': 95.7, '5%': 100.4, '7%': 104.3, '10%': 109.6, '15%': 118.1, '20%': 126.9, '30%': 146.9, '40%': 172.6, '50%': 208.0 },
    { N: 106, '0.1%': 80.5, '0.2%': 82.8, '0.5%': 86.4, '1%': 89.7, '1.2%': 90.7, '1.3%': 91.1, '1.5%': 91.90, '2%': 93.8, '3%': 96.7, '5%': 101.4, '7%': 105.3, '10%': 110.7, '15%': 119.3, '20%': 128.1, '30%': 148.3, '40%': 174.2, '50%': 210.0 },
    { N: 107, '0.1%': 81.4, '0.2%': 83.7, '0.5%': 87.4, '1%': 90.7, '1.2%': 91.6, '1.3%': 92.1, '1.5%': 92.86, '2%': 94.8, '3%': 97.7, '5%': 102.4, '7%': 106.4, '10%': 111.8, '15%': 120.4, '20%': 129.4, '30%': 149.7, '40%': 175.9, '50%': 212.0 },
    { N: 108, '0.1%': 82.3, '0.2%': 84.6, '0.5%': 88.3, '1%': 91.6, '1.2%': 92.6, '1.3%': 93.1, '1.5%': 93.82, '2%': 95.7, '3%': 98.7, '5%': 103.4, '7%': 107.4, '10%': 112.9, '15%': 121.6, '20%': 130.6, '30%': 151.1, '40%': 177.6, '50%': 214.0 },
    { N: 109, '0.1%': 83.2, '0.2%': 85.5, '0.5%': 89.2, '1%': 92.5, '1.2%': 93.5, '1.3%': 94.0, '1.5%': 94.78, '2%': 96.7, '3%': 99.7, '5%': 104.5, '7%': 108.5, '10%': 114.0, '15%': 122.8, '20%': 131.9, '30%': 152.6, '40%': 179.2, '50%': 216.0 },
    { N: 110, '0.1%': 84.1, '0.2%': 86.4, '0.5%': 90.1, '1%': 93.5, '1.2%': 94.5, '1.3%': 95.0, '1.5%': 95.74, '2%': 97.7, '3%': 100.7, '5%': 105.5, '7%': 109.5, '10%': 115.1, '15%': 124.0, '20%': 133.1, '30%': 154.0, '40%': 180.9, '50%': 218.0 },
    { N: 111, '0.1%': 85.0, '0.2%': 87.3, '0.5%': 91.0, '1%': 94.4, '1.2%': 95.5, '1.3%': 95.9, '1.5%': 96.70, '2%': 98.7, '3%': 101.7, '5%': 106.5, '7%': 110.6, '10%': 116.2, '15%': 125.1, '20%': 134.3, '30%': 155.4, '40%': 182.6, '50%': 220.0 },
    { N: 112, '0.1%': 85.8, '0.2%': 88.3, '0.5%': 92.0, '1%': 95.4, '1.2%': 96.4, '1.3%': 96.9, '1.5%': 97.66, '2%': 99.6, '3%': 102.7, '5%': 107.5, '7%': 111.7, '10%': 117.3, '15%': 126.3, '20%': 135.6, '30%': 156.9, '40%': 184.2, '50%': 222.0 },
    { N: 113, '0.1%': 86.7, '0.2%': 89.2, '0.5%': 92.9, '1%': 96.3, '1.2%': 97.4, '1.3%': 97.8, '1.5%': 98.62, '2%': 100.6, '3%': 103.7, '5%': 108.6, '7%': 112.7, '10%': 118.4, '15%': 127.5, '20%': 136.8, '30%': 158.3, '40%': 185.9, '50%': 224.0 },
    { N: 114, '0.1%': 87.6, '0.2%': 90.1, '0.5%': 93.8, '1%': 97.3, '1.2%': 98.3, '1.3%': 98.8, '1.5%': 99.58, '2%': 101.6, '3%': 104.7, '5%': 109.6, '7%': 113.8, '10%': 119.5, '15%': 128.6, '20%': 138.1, '30%': 159.7, '40%': 187.6, '50%': 226.0 },
    { N: 115, '0.1%': 88.5, '0.2%': 91.0, '0.5%': 94.7, '1%': 98.2, '1.2%': 99.3, '1.3%': 99.7, '1.5%': 100.54, '2%': 102.5, '3%': 105.7, '5%': 110.6, '7%': 114.8, '10%': 120.6, '15%': 129.8, '20%': 139.3, '30%': 161.1, '40%': 189.2, '50%': 228.0 },
    { N: 116, '0.1%': 89.4, '0.2%': 91.9, '0.5%': 95.7, '1%': 99.2, '1.2%': 100.2, '1.3%': 100.7, '1.5%': 101.50, '2%': 103.5, '3%': 106.7, '5%': 111.7, '7%': 115.9, '10%': 121.7, '15%': 131.0, '20%': 140.6, '30%': 162.6, '40%': 190.9, '50%': 230.0 },
    { N: 117, '0.1%': 90.3, '0.2%': 92.8, '0.5%': 96.6, '1%': 100.1, '1.2%': 101.2, '1.3%': 101.7, '1.5%': 102.46, '2%': 104.5, '3%': 107.7, '5%': 112.7, '7%': 116.9, '10%': 122.8, '15%': 132.1, '20%': 141.8, '30%': 164.0, '40%': 192.6, '50%': 232.0 },
    { N: 118, '0.1%': 91.2, '0.2%': 93.7, '0.5%': 97.5, '1%': 101.1, '1.2%': 102.1, '1.3%': 102.6, '1.5%': 103.43, '2%': 105.5, '3%': 108.7, '5%': 113.7, '7%': 118.0, '10%': 123.9, '15%': 133.3, '20%': 143.1, '30%': 165.4, '40%': 194.2, '50%': 234.0 },
    { N: 119, '0.1%': 92.1, '0.2%': 94.6, '0.5%': 98.5, '1%': 102.0, '1.2%': 103.1, '1.3%': 103.6, '1.5%': 104.39, '2%': 106.4, '3%': 109.7, '5%': 114.7, '7%': 119.1, '10%': 125.0, '15%': 134.5, '20%': 144.3, '30%': 166.8, '40%': 195.9, '50%': 236.0 },
    { N: 120, '0.1%': 93.0, '0.2%': 95.5, '0.5%': 99.4, '1%': 103.0, '1.2%': 104.0, '1.3%': 104.5, '1.5%': 105.35, '2%': 107.4, '3%': 110.7, '5%': 115.8, '7%': 120.1, '10%': 126.1, '15%': 135.7, '20%': 145.6, '30%': 168.3, '40%': 197.6, '50%': 238.0 },
    { N: 121, '0.1%': 93.9, '0.2%': 96.4, '0.5%': 100.3, '1%': 103.9, '1.2%': 105.0, '1.3%': 105.5, '1.5%': 106.31, '2%': 108.4, '3%': 111.6, '5%': 116.8, '7%': 121.2, '10%': 127.2, '15%': 136.8, '20%': 146.8, '30%': 169.7, '40%': 199.2, '50%': 240.0 },
    { N: 122, '0.1%': 94.7, '0.2%': 97.3, '0.5%': 101.2, '1%': 104.9, '1.2%': 105.9, '1.3%': 106.4, '1.5%': 107.28, '2%': 109.4, '3%': 112.6, '5%': 117.8, '7%': 122.2, '10%': 128.3, '15%': 138.0, '20%': 148.1, '30%': 171.1, '40%': 200.9, '50%': 242.0 },
    { N: 123, '0.1%': 95.6, '0.2%': 98.2, '0.5%': 102.2, '1%': 105.8, '1.2%': 106.9, '1.3%': 107.4, '1.5%': 108.24, '2%': 110.3, '3%': 113.6, '5%': 118.9, '7%': 123.3, '10%': 129.4, '15%': 139.2, '20%': 149.3, '30%': 172.6, '40%': 202.6, '50%': 244.0 },
    { N: 124, '0.1%': 96.5, '0.2%': 99.1, '0.5%': 103.1, '1%': 106.8, '1.2%': 107.9, '1.3%': 108.4, '1.5%': 109.21, '2%': 111.3, '3%': 114.6, '5%': 119.9, '7%': 124.4, '10%': 130.5, '15%': 140.3, '20%': 150.6, '30%': 174.0, '40%': 204.2, '50%': 246.0 },
    { N: 125, '0.1%': 97.4, '0.2%': 100.0, '0.5%': 104.0, '1%': 107.7, '1.2%': 108.8, '1.3%': 109.3, '1.5%': 110.17, '2%': 112.3, '3%': 115.6, '5%': 120.9, '7%': 125.4, '10%': 131.6, '15%': 141.5, '20%': 151.8, '30%': 175.4, '40%': 205.9, '50%': 248.0 },
    { N: 126, '0.1%': 98.3, '0.2%': 100.9, '0.5%': 105.0, '1%': 108.7, '1.2%': 109.8, '1.3%': 110.3, '1.5%': 111.14, '2%': 113.3, '3%': 116.6, '5%': 121.9, '7%': 126.5, '10%': 132.7, '15%': 142.7, '20%': 153.0, '30%': 176.8, '40%': 207.6, '50%': 250.0 },
    { N: 127, '0.1%': 99.2, '0.2%': 101.8, '0.5%': 105.9, '1%': 109.6, '1.2%': 110.7, '1.3%': 111.2, '1.5%': 112.10, '2%': 114.3, '3%': 117.6, '5%': 123.0, '7%': 127.5, '10%': 133.8, '15%': 143.9, '20%': 154.3, '30%': 178.3, '40%': 209.2, '50%': 252.0 },
    { N: 128, '0.1%': 100.1, '0.2%': 102.8, '0.5%': 106.8, '1%': 110.6, '1.2%': 111.7, '1.3%': 112.2, '1.5%': 113.07, '2%': 115.2, '3%': 118.6, '5%': 124.0, '7%': 128.6, '10%': 134.9, '15%': 145.0, '20%': 155.5, '30%': 179.7, '40%': 210.9, '50%': 254.0 },
    { N: 129, '0.1%': 101.0, '0.2%': 103.7, '0.5%': 107.8, '1%': 111.5, '1.2%': 112.6, '1.3%': 113.2, '1.5%': 114.03, '2%': 116.2, '3%': 119.6, '5%': 125.0, '7%': 129.6, '10%': 136.0, '15%': 146.2, '20%': 156.8, '30%': 181.1, '40%': 212.6, '50%': 256.0 },
    { N: 130, '0.1%': 101.9, '0.2%': 104.6, '0.5%': 108.7, '1%': 112.5, '1.2%': 113.6, '1.3%': 114.1, '1.5%': 115.00, '2%': 117.2, '3%': 120.6, '5%': 126.1, '7%': 130.7, '10%': 137.1, '15%': 147.4, '20%': 158.0, '30%': 182.5, '40%': 214.2, '50%': 258.0 },
    { N: 131, '0.1%': 102.8, '0.2%': 105.5, '0.5%': 109.6, '1%': 113.4, '1.2%': 114.6, '1.3%': 115.1, '1.5%': 115.96, '2%': 118.2, '3%': 121.6, '5%': 127.1, '7%': 131.8, '10%': 138.2, '15%': 148.5, '20%': 159.3, '30%': 184.0, '40%': 215.9, '50%': 260.0 },
    { N: 132, '0.1%': 103.7, '0.2%': 106.4, '0.5%': 110.6, '1%': 114.4, '1.2%': 115.5, '1.3%': 116.0, '1.5%': 116.93, '2%': 119.1, '3%': 122.6, '5%': 128.1, '7%': 132.8, '10%': 139.3, '15%': 149.7, '20%': 160.5, '30%': 185.4, '40%': 217.6, '50%': 262.0 },
    { N: 133, '0.1%': 104.6, '0.2%': 107.3, '0.5%': 111.5, '1%': 115.3, '1.2%': 116.5, '1.3%': 117.0, '1.5%': 117.90, '2%': 120.1, '3%': 123.6, '5%': 129.2, '7%': 133.9, '10%': 140.4, '15%': 150.9, '20%': 161.8, '30%': 186.8, '40%': 219.2, '50%': 264.0 },
    { N: 134, '0.1%': 105.5, '0.2%': 108.2, '0.5%': 112.4, '1%': 116.3, '1.2%': 117.4, '1.3%': 118.0, '1.5%': 118.87, '2%': 121.1, '3%': 124.6, '5%': 130.2, '7%': 134.9, '10%': 141.5, '15%': 152.0, '20%': 163.0, '30%': 188.3, '40%': 220.9, '50%': 266.0 },
    { N: 135, '0.1%': 106.4, '0.2%': 109.1, '0.5%': 113.3, '1%': 117.2, '1.2%': 118.4, '1.3%': 118.9, '1.5%': 119.83, '2%': 122.1, '3%': 125.6, '5%': 131.2, '7%': 136.0, '10%': 142.6, '15%': 153.2, '20%': 164.3, '30%': 189.7, '40%': 222.6, '50%': 268.0 },
    { N: 136, '0.1%': 107.3, '0.2%': 110.0, '0.5%': 114.3, '1%': 118.2, '1.2%': 119.4, '1.3%': 119.9, '1.5%': 120.80, '2%': 123.1, '3%': 126.6, '5%': 132.2, '7%': 137.1, '10%': 143.7, '15%': 154.4, '20%': 165.5, '30%': 191.1, '40%': 224.2, '50%': 270.0 },
    { N: 137, '0.1%': 108.2, '0.2%': 111.0, '0.5%': 115.2, '1%': 119.1, '1.2%': 120.3, '1.3%': 120.9, '1.5%': 121.77, '2%': 124.0, '3%': 127.6, '5%': 133.3, '7%': 138.1, '10%': 144.8, '15%': 155.6, '20%': 166.8, '30%': 192.5, '40%': 225.9, '50%': 272.0 },
    { N: 138, '0.1%': 109.1, '0.2%': 111.9, '0.5%': 116.2, '1%': 120.1, '1.2%': 121.3, '1.3%': 121.8, '1.5%': 122.74, '2%': 125.0, '3%': 128.6, '5%': 134.3, '7%': 139.2, '10%': 145.9, '15%': 156.7, '20%': 168.0, '30%': 194.0, '40%': 227.6, '50%': 274.0 },
    { N: 139, '0.1%': 110.0, '0.2%': 112.8, '0.5%': 117.1, '1%': 121.0, '1.2%': 122.2, '1.3%': 122.8, '1.5%': 123.71, '2%': 126.0, '3%': 129.6, '5%': 135.3, '7%': 140.2, '10%': 147.0, '15%': 157.9, '20%': 169.3, '30%': 195.4, '40%': 229.2, '50%': 276.0 },
    { N: 140, '0.1%': 110.9, '0.2%': 113.7, '0.5%': 118.0, '1%': 122.0, '1.2%': 123.2, '1.3%': 123.7, '1.5%': 124.67, '2%': 127.0, '3%': 130.6, '5%': 136.4, '7%': 141.3, '10%': 148.1, '15%': 159.1, '20%': 170.5, '30%': 196.8, '40%': 230.9, '50%': 278.0 },
    { N: 141, '0.1%': 111.8, '0.2%': 114.6, '0.5%': 118.9, '1%': 123.0, '1.2%': 124.2, '1.3%': 124.7, '1.5%': 125.64, '2%': 128.0, '3%': 131.6, '5%': 137.4, '7%': 142.4, '10%': 149.2, '15%': 160.2, '20%': 171.8, '30%': 198.3, '40%': 232.6, '50%': 280.0 },
    { N: 142, '0.1%': 112.7, '0.2%': 115.5, '0.5%': 120.0, '1%': 123.9, '1.2%': 125.1, '1.3%': 125.7, '1.5%': 126.66, '2%': 129.0, '3%': 132.6, '5%': 138.5, '7%': 143.5, '10%': 150.3, '15%': 161.4, '20%': 173.0, '30%': 199.7, '40%': 234.2, '50%': 282.0 },
    { N: 143, '0.1%': 113.5, '0.2%': 116.3, '0.5%': 120.8, '1%': 124.9, '1.2%': 126.1, '1.3%': 126.7, '1.5%': 127.59, '2%': 129.9, '3%': 133.6, '5%': 139.5, '7%': 144.5, '10%': 151.4, '15%': 162.6, '20%': 174.2, '30%': 201.1, '40%': 235.9, '50%': 284.0 },
    { N: 144, '0.1%': 114.4, '0.2%': 117.2, '0.5%': 121.8, '1%': 125.9, '1.2%': 127.1, '1.3%': 127.6, '1.5%': 128.52, '2%': 130.9, '3%': 134.6, '5%': 140.5, '7%': 145.5, '10%': 152.5, '15%': 163.8, '20%': 175.5, '30%': 202.5, '40%': 237.6, '50%': 286.0 },
    { N: 145, '0.1%': 115.3, '0.2%': 118.2, '0.5%': 122.7, '1%': 126.8, '1.2%': 128.0, '1.3%': 128.6, '1.5%': 129.54, '2%': 132.0, '3%': 135.7, '5%': 141.6, '7%': 146.6, '10%': 153.6, '15%': 164.9, '20%': 176.7, '30%': 204.0, '40%': 239.2, '50%': 288.0 },
    { N: 146, '0.1%': 116.3, '0.2%': 119.2, '0.5%': 123.7, '1%': 127.8, '1.2%': 129.0, '1.3%': 129.5, '1.5%': 130.46, '2%': 132.9, '3%': 136.6, '5%': 142.6, '7%': 147.6, '10%': 154.7, '15%': 166.1, '20%': 178.0, '30%': 205.4, '40%': 240.9, '50%': 290.0 },
    { N: 147, '0.1%': 117.2, '0.2%': 120.1, '0.5%': 124.6, '1%': 128.7, '1.2%': 129.9, '1.3%': 130.5, '1.5%': 131.44, '2%': 133.9, '3%': 137.6, '5%': 143.6, '7%': 148.8, '10%': 155.8, '15%': 167.3, '20%': 179.2, '30%': 206.8, '40%': 242.6, '50%': 292.0 },
    { N: 148, '0.1%': 118.1, '0.2%': 121.0, '0.5%': 125.5, '1%': 129.6, '1.2%': 130.9, '1.3%': 131.4, '1.5%': 132.38, '2%': 134.8, '3%': 138.6, '5%': 144.7, '7%': 149.8, '10%': 156.9, '15%': 168.5, '20%': 180.5, '30%': 208.2, '40%': 244.2, '50%': 294.0 },
    { N: 149, '0.1%': 119.0, '0.2%': 121.9, '0.5%': 126.4, '1%': 130.6, '1.2%': 131.8, '1.3%': 132.5, '1.5%': 133.40, '2%': 135.8, '3%': 139.6, '5%': 145.7, '7%': 150.8, '10%': 158.0, '15%': 169.6, '20%': 181.7, '30%': 209.7, '40%': 245.9, '50%': 296.0 },
    { N: 150, '0.1%': 119.9, '0.2%': 122.8, '0.5%': 127.4, '1%': 131.6, '1.2%': 132.8, '1.3%': 133.4, '1.5%': 134.39, '2%': 136.8, '3%': 140.7, '5%': 146.7, '7%': 151.9, '10%': 159.1, '15%': 170.8, '20%': 183.0, '30%': 211.1, '40%': 247.6, '50%': 298.0 }
];
