export interface DeltaPatchInfo {
  fromVersionCode: number;
  fromVersionName?: string;
  patchUrl: string;
  patchSizeBytes: number;
  patchSha256: string;
}

export interface RemoteModuleSplit {
  id: string;
  splitName: string;
  name: string;
  description?: string;
  category?: string;
  highlightNote?: string;
  apkUrl: string;
  apkSizeBytes: number;
  sha256: string;
}

export interface DocumentationSection {
  title: string;
  items: string[];
}

export interface ReleaseInfo {
  versionCode: number;
  versionName: string;
  releasedAt: string;
  channel?: string;
  summary: string;
  highlights?: string[];
  changelog: string[];
  apkUrl: string;
  apkSizeBytes: number;
  sha256: string;
  minSdk: number;
  abi?: string;
  patches: DeltaPatchInfo[];
  coreApkUrl?: string;
  coreApkSizeBytes?: number;
  coreSha256?: string;
  modules?: RemoteModuleSplit[];
  modulesSignature?: string;
  documentation: DocumentationSection[];
  signatureAlg?: string;
  signature?: string;
}

export interface ReleasesManifest {
  latest: ReleaseInfo;
  versions: ReleaseInfo[];
}
