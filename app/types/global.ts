

export type TSpecialties = {
    id: string
    title: string,
    icon: string
  }


  export type TDoctors = {
      id: string
      name: string,
      email: string,
      contactNumber: string,
      profilePhoto: string,
      address: any,
      registrationNumber: string,
      experience: number,
      gender: string,
      appoinmentFee: string,
      qualification: string,
      currentWorkingPlace: string,
      designation: string,
      isDeleted: boolean,
      averageRating: number,
      createdAt: Date,
      updatedAt: Date,
      doctorSpecialties: Record<string,any>[],
      reviews?: Record<string,any>[];
    }




    export type TColumn<T> = {
    accessor: any
    key: string,
    header: string,
    render: T
}